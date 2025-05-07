function loadSavedFields() {
    const savedFields = localStorage.getItem('steps');
    if (savedFields) {
        try {
            const fields = JSON.parse(savedFields);
            fields.forEach(field => {
                if (window.addFieldWithData) {
                    addFieldWithData(field.name, field.value, field.label);
                }
            });
        } catch (e) {
            console.error('Ошибка парсинга savedFields:', e);
        }
    }
}

document.addEventListener('DOMContentLoaded', loadSavedFields);
    
function addFieldWithData(name, value, labelText) {
    const container = document.getElementById('main-form');
    const p = document.createElement('p');
    const label = document.createElement('label');
    label.textContent = labelText || 'test';
    label.className = 'newField';
    const input = document.createElement('input');
    input.name = name;
    input.value = value || '';

    input.addEventListener('input', function() {
    console.log(`Поле ${name} обновлено:`, this.value);
    saveCurrentFields();
  });
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'X';
    deleteBtn.type = 'button';
    deleteBtn.onclick = function() {
        p.remove();
        removeFieldByName(p.name)
        renumberSteps();
        saveCurrentFields();
    };

    p.appendChild(label);
    p.appendChild(input);
    p.appendChild(deleteBtn);

    const lastElement = container.lastElementChild;
    container.insertBefore(p, lastElement);
}

function removeFieldByName(fieldName) {
    const fields = JSON.parse(localStorage.getItem('steps')) || [];
    const updatedFields = fields.filter(field => field.name !== fieldName);
}

function saveCurrentFields() {
  const fields = [];
  document.querySelectorAll('input[name^="step_"]').forEach(input => {
    fields.push({
      name: input.name,
      value: input.value,
      label: input.previousElementSibling?.textContent || 'Шаг'
    });
  });
  localStorage.setItem('steps', JSON.stringify(fields));
}

function renumberSteps() {
    const fields = document.querySelectorAll("[class^='newField']");
    fields.forEach((field, index) => {
        field.setAttribute('label', `Шаг ${index + 1}`);
        field.textContent = `Шаг ${index + 1}`;
    });
}

function addField() {
    const count = document.querySelectorAll("[name^=step]");
    const name = `step_${count.length + 1}`;
    addFieldWithData(name, '', 'Шаг'+ ' ' + (count.length + 1));
    renumberSteps();
}