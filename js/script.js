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
    theme: 'snow',
    modules: {
        toolbar: {
            container: '#toolbar', // Attach custom toolbar
            handlers: {
                'custom-dropdown': function () {
                    // Toggle custom dropdown visibility
                    alert("xd")
                }
            }
        }
    }
});


function insertChip(text) {
    const range = quill.getSelection(); // Get current selection

    if (range) {
        const delta = quill.getContents(range.index, 1);
        if (delta.ops && delta.ops.length && delta.ops[0].insert === '\u200B') {
            quill.deleteText(range.index, 1, Quill.sources.SILENT);
        }
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

// Handle applying selection from the dropdown
document.getElementById('apply-selection').addEventListener('click', function () {
    const select1Value = document.getElementById('select1').value;
    const select2Value = document.getElementById('select2').value;
    console.log(`Selected values: ${select1Value}, ${select2Value}`);

    // Focus the editor, and scroll the selection into view
    quill.focus();

    // Focus the editor, but don't scroll
    quill.focus({ preventScroll: true });
    // Insert chip or apply action based on the selected values
    insertChip(`${select2Value}`);

    // Hide the dropdown after applying selection
    document.getElementById('dropdown-menu').style.display = 'none';
});

// Show dropdown when "xd" button is clicked
const customButton = document.getElementById('custom-button');
const dropdownMenu = document.getElementById('dropdown-menu');

customButton.addEventListener('click', function (e) {
    // Toggle dropdown visibility
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
    console.log(e)
    // Position the dropdown below the button
    dropdownMenu.style.top = customButton.getBoundingClientRect().bottom + 'px';
    dropdownMenu.style.left = customButton.getBoundingClientRect().left + 'px';
});

const optionsMap = {
    general: ['Option A', 'Option B'],
    clientes: ['Option C', 'Option D']
};

function updateSelect2Options() {
    const selectedOption = select1.value;
    const newOptions = optionsMap[selectedOption];

    // Clear the current options in select2
    select2.innerHTML = '';

    // Populate select2 with new options
    newOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        select2.appendChild(opt);
    });
}


// Hide dropdown when focus is lost
dropdownMenu.addEventListener('focusout', (event) => {
    console.log("pierdefoco")
    // Check if the new focus is outside the dropdown or its child elements
    if (!dropdownMenu.contains(event.relatedTarget) && event.relatedTarget !== customButton) {
        dropdownMenu.style.display = 'none';
    }
});

document.addEventListener("click", (event) => {
    if (event.target != "button#custom-button") {
        // dropdownMenu.style.display = 'none';
    }
})