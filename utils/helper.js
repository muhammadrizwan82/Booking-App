// helper.js
export const camelCase = (str) => {
    return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
        return chr.toUpperCase();
    });
};

console.log(camelCase('rizwan'))