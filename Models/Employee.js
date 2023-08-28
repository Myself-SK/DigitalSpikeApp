const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const EmployeeSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    salary: {
        type: Number
    },
    designation: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


EmployeeSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }

        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    } catch (err) {
        return next(err);
    }
});

EmployeeSchema.pre("findOneAndUpdate", async function (next) {
    try {
        if (this._update.password) {
            const hashed = await bcrypt.hash(this._update.password, 10);
            this._update.password = hashed;
            next();

        }
    } catch (err) {
        return next(err);
    }
});

EmployeeSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('Employee', EmployeeSchema);