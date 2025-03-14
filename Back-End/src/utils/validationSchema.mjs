
export const createUserValidationSchema = {
    userType: {
        notEmpty: {
            errorMessage: "User Type cannot be empty",
        },
        isString: {
            errorMessage: "User Type must be a string!",
        },
    },
    userName: {
        isLength: {
            options: { min: 3, max: 32 },
            errorMessage: "User Name must be at least 3 characters with a max of 32 characters",
        },
        notEmpty: {
            errorMessage: "User Name cannot be empty",
        },
        isString: {
            errorMessage: "User Name must be a string!",
        },
    },
    phoneNo: {
        notEmpty: {
            errorMessage: "Phone Number cannot be empty",
        },
        isString: {
            errorMessage: "Phone Number must be a string!",
        },
        isMobilePhone: {
            options: ['any'],
            errorMessage: "Phone Number must be a valid mobile number!",
        },
    },
    password: {
        isLength: {
            options: { min: 8, max: 32 },
            errorMessage: "Password must be at least 8 characters with a max of 32 characters",
        },
        notEmpty: {
            errorMessage: "Password cannot be empty",
        },
        isString: {
            errorMessage: "Password must be a string!",
        },
    },
};




export const createProductValidationSchema = {
    productName: {
        isLength: {
            options: { min: 3, max: 32 },
            errorMessage: "Product Name must be at least 3 characters with a max of 32 characters",
        },
        notEmpty: {
            errorMessage: "Product Name cannot be empty",
        },
        isString: {
            errorMessage: "Product Name must be a string!",
        },
    },
    productImage: {
        notEmpty: {
            errorMessage: "Product Image cannot be empty",
        },
        isString: {
            errorMessage: "Product Image must be a string!",
        },
    },
    price: {
        notEmpty: {
            errorMessage: "Price cannot be empty",
        },
        isNumeric: {
            errorMessage: "Price must be a number!",
        },
    },
    quantity: {
        notEmpty: {
            errorMessage: "Quantity cannot be empty",
        },
        isNumeric: {
            errorMessage: "Quantity must be a number!",
        },
    },
    description: {
        isLength: {
            options: { min: 10, max: 200 },
            errorMessage: "Description must be at least 10 characters with a max of 200 characters",
        },
        notEmpty: {
            errorMessage: "Description cannot be empty",
        },
        isString: {
            errorMessage: "Description must be a string!",
        },
    },

    sales: {
        notEmpty: {
            errorMessage: "Sales cannot be empty",
        },
        isNumeric: {
            errorMessage: "Sales must be a number!",
        }
    }
};



export const createCartItemValidationSchema = {
    productId: {
        notEmpty: {
            errorMessage: "Product ID cannot be empty",
        },
        isMongoId: {
            errorMessage: "Product ID must be a valid Mongo ID",
        },
    },
    quantity: {
        notEmpty: {
            errorMessage: "Quantity cannot be empty",
        },
        isNumeric: {
            errorMessage: "Quantity must be a number!",
        },
    },
};



export const createPostValidationSchema = {
    text: {
        isLength: {
            options: { min: 1, max: 500 },
            errorMessage: "Text must be at least 1 character with a max of 500 characters",
        },
        notEmpty: {
            errorMessage: "Text cannot be empty",
        },
        isString: {
            errorMessage: "Text must be a string!",
        },
    },
    image: {
        optional: true,
        isString: {
            errorMessage: "Image must be a string!",
        },
    },
    userId: {
        notEmpty: {
            errorMessage: "User ID cannot be empty",
        },
        isMongoId: {
            errorMessage: "User ID must be a valid Mongo ID",
        },
    },
};

