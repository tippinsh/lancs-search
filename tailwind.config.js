/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.vue",
    ],
    theme: {
        extend: {
            backgroundImage: {
                hero: "url('/Users/hollytippins/Documents/Code/Inertia/lancs-laravel/resources/js/Pages/Index/Assets/hero.jpg')",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
