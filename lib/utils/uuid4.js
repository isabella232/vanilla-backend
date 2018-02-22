const pattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

const replacements = {
  x: "0123456789abcdef",
  y: "89ab"
};

function getRandomCharacter(char_list) {
  const random_position = Math.floor(Math.random() * char_list.length);
  return char_list.charAt(random_position);
}

function getPatternCharacter(character) {
  return character in replacements
    ? // eslint-disable-next-line security/detect-object-injection
      getRandomCharacter(replacements[character])
    : character;
}

/**
 * Generates new valid UUID4 identifier.
 * @returns {string}
 */
function generate() {
  return pattern
    .split("")
    .map(getPatternCharacter)
    .join("");
}

module.exports = { generate };
