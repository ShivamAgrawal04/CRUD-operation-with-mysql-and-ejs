import {
  createUserDB,
  deleteUserByIdDB,
  getAllUsersDB,
  getTotalUserCountDB,
  getUserByEmailDB,
  getUserByIdDB,
  getUserByNameDB,
  updateUserByIdDB,
} from "../models/user.model.js";

export const createNewUser = async (req, res, next) => {
  try {
    const { id, name, email, password } = req.body;
    if (!id || !name || !email || !password)
      throw new Error("Required All fields");
    const result = await createUserDB(id, name, email, password);
    res.redirect("/");
    console.log(result);

    // res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getNewUserPage = (req, res) => {
  res.render("pages/AddUserForm", { user: null });
};

export const getEditUserPage = async (req, res) => {
  const { id } = req.params;
  const [user] = await getUserByIdDB(id); // Fetch user from DB
  res.render("pages/AddUserForm", { user });
};

export const getAllUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let users = [];
    let totalPages = 0;

    if (search) {
      // Step 1: Try to find user by ID
      const [userById] = await getUserByIdDB(search);
      if (userById) {
        users = [userById];
      } else {
        // Step 2: If not found by ID, try to find by Email
        const [userByEmail] = await getUserByEmailDB(search);
        if (userByEmail) {
          users = [userByEmail];
        } else {
          // Step 3: If not found by Email, try to find by Name
          const [userByName] = await getUserByNameDB(search);
          if (userByName) {
            users = [userByName];
          }
        }
      }

      if (users.length === 0) {
        return res
          .status(404)
          .send(`User not found with ID, email, or name: ${search}`);
      }
    } else {
      // If no search query, load all users (with pagination)
      users = await getAllUsersDB(page, limit);
      const totalUsers = await getTotalUserCountDB();
      totalPages = Math.ceil(totalUsers / limit);
    }

    // Render users as an array for consistent rendering in EJS
    res.render("pages/Home", { users, totalPages, page });

    // Uncomment for API response:
    // res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("User ID is required");

    const [user] = await getUserByIdDB(id);
    if (!user) throw new Error("User not found");

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

export const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    if (!email) throw new Error("please give an email");
    const [user] = await getUserByEmailDB(email);
    if (!user) throw new Error("User not found");

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    console.log(id);

    const [user] = await getUserByIdDB(id);
    if (!user) throw new Error("User not found");
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await updateUserByIdDB(user);
    res.redirect("/api/v1/users");
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};
export const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("User ID is required");
    const user = await getUserByIdDB(id);
    if (user.length == 0) throw new Error("User Not found");
    await deleteUserByIdDB(id);
    // res.json({
    //   success: true,
    //   message: "User deleted successfully",
    //   deletedUser: user,
    // });
    res.redirect("/api/v1/users");
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};
