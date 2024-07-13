const { dbCon } = require("../configuration");
const { userValidator, loginSchema } = require("../validator");
const { hashSync, compareSync } = require("bcryptjs");
class User {
  constructor(userData) {
    this.userData = { ...userData };
  }
  save(cb) {
    dbCon("app_users", async (db) => {
      try {
        const hashedPass = hashSync(this.userData["password"], 12);
        this.userData["password"] = hashedPass;
        await db.insertOne(this.userData);
        cb();
      } catch (err) {
        cb(err);
      }
    });
  }

  checkExistance() {
    return new Promise((resolve, reject) => {
      dbCon("app_users", async (db) => {
        try {
          const user = await db.findOne({
            $or: [
              { username: this.userData["username"] },
              { email: this.userData["email"] },
            ],
          });

          if (!user) {
            resolve({
              check: false,
            });
          } else if (this.userData["username"] === user.username) {
            resolve({
              check: true,
              message: "This user name is already used",
            });
          } else if (this.userData["email"] === user.email) {
            resolve({
              check: true,
              message: "This email is already used",
            });
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  static validate(userData) {
    return userValidator.validate(userData);
  }

  static loigin(userData) {
    return new Promise((resolve, reject) => {
      const validation = loginSchema.validate(userData);
      if (validation.error) {
        const error = new Error(validation.error.message);
        error.statusCode = 400;
        return resolve(error);
      }

      dbCon("app_users", async (db) => {
        try {
          // find user
          const user = await db.findOne(
            {
              $or: [
                { username: userData["username"] },
                { email: userData["email"] },
              ],
            },
            { projection: { username: 1, password: 1 } }
          );

          // compareSync(userData["password"], user.password); // Check password

          if (!user || !compareSync(userData["password"], user.password)) {
            const error = new Error("Invalide user name and password");
            error.statusCode = 404;
            return resolve(error);
          }

          resolve(user);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}

module.exports = User;
