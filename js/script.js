const Quill = window.Quill;

let Embed = Quill.import('blots/embed');

class ChipBlot extends Embed {
    static blotName = 'chip'
    static tagName = 'span'
    static className = ['chip']

    static create(value) {
        let node = super.create();
        node.setAttribute('contenteditable', 'false'); // Make it non-editable
        node.innerText = value; // Set the chip's text content
        return node;
    }

    static value(node) {
        return node;
    }
}

Quill.register(ChipBlot);

const quill = new Quill('#editor', {
    theme: 'snow'
});


function insertChip(text) {
    const range = quill.getSelection(); // Get current selection

    if (range) {
        // Insertar el chip en la posición actual
        quill.insertEmbed(range.index, 'chip', text, Quill.sources.USER);
        quill.insertText(range.index + 1, '\u200B', Quill.sources.USER);
        // Set the cursor after the chip and space
        quill.setSelection(range.index + 1, Quill.sources.SILENT);
    }
}

document.getElementById("add-chip").addEventListener('click', function () {
    console.log(Quill.imports)
    insertChip('mi variable chida')
})


document.getElementById("get-content").addEventListener('click', () => {
    const delta = quill.getContents()
    console.log(delta)
})