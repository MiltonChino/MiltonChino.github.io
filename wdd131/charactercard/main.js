
const character = {
    name: 'Kroakus',
    image: 'snortleblat.webp',
    class: 'Swamp Beast',
    level: 1,
    health: 100,
    attacked: function () {
        this.health = this.health - 10;
        renderCharacter(character);
        if (this.health <= 0) {
            console.log(`${this.name} defeated!`);
            alert(`${this.name} defeated!`);
        }
    },
    leveledup: function () {
        this.level = this.level + 1;
        renderCharacter(character);
    }
};

document.querySelector('#name').textContent = character.name;
document.querySelector('#charclass').textContent = character.class;

document.querySelector('#character-image').setAttribute('src', character.image);
document.querySelector('#character-image').setAttribute('alt', character.name);

function characterTemplate(character) {
    return `
    <p id="charclass"><strong>Class:</strong> ${character.class}</p>
    <p id="level"><strong>Level:</strong> ${character.level}</p>
    <p id="health"><strong>Health:</strong> ${character.health}</p>`
}

function renderCharacter(character) {
    const html = characterTemplate(character);
    document.querySelector("#stats").innerHTML = html;
}

renderCharacter(character);

document.querySelector("#attacked").addEventListener("click", function () {
    character.attacked();
});

document.querySelector("#leveledup").addEventListener("click", function () {
    character.leveledup();
});