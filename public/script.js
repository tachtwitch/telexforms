const formBuilder = document.getElementById('form-builder');
const addFieldBtn = document.getElementById('add-field-btn');
const saveFormBtn = document.getElementById('save-form-btn');
const loadFormBtn = document.getElementById('load-form-btn');
const deleteFormBtn = document.getElementById('delete-form-btn');
const formPreview = document.getElementById('form-preview');
const formList = document.getElementById('form-list');

let form = {
  id: Date.now(),
  name: '',
  fields: [],
};

let savedForms = JSON.parse(localStorage.getItem('savedForms')) || [];

addFieldBtn.addEventListener('click', addField);
saveFormBtn.addEventListener('click', saveForm);
loadFormBtn.addEventListener('click', loadForm);
deleteFormBtn.addEventListener('click', deleteForm);

function addField() {
  const fieldTypes = ['text', 'email', 'phone', 'checkbox', 'radio', 'select'];
  const fieldType = prompt(`Enter field type (${fieldTypes.join(', ')}):`);
  if (fieldType) {
    const fieldName = prompt('Enter field name:');
    const fieldLabel = prompt('Enter field label:');
    const fieldPlaceholder = prompt('Enter field placeholder:');
    const fieldRequired = confirm('Make field required?');
    form.fields.push({
      type: fieldType,
      name: fieldName,
      label: fieldLabel,
      placeholder: fieldPlaceholder,
      required: fieldRequired,
    });
    renderFormPreview();
  }
}

function saveForm() {
  form.name = window.prompt('Enter form name:');
  if (form.name && form.fields.length > 0) {
    savedForms.push(form);
    localStorage.setItem('savedForms', JSON.stringify(savedForms));
    window.alert('Form saved successfully!');
    renderFormList();
    form = {
      id: Date.now(),
      name: '',
      fields: [],
    };
    renderFormPreview();
  } else {
    window.alert('Please enter form name and add at least one field.');
  }
}

function loadForm() {
  const formId = window.prompt('Enter form ID:');
  if (formId) {
    const loadedForm = savedForms.find((form) => form.id === parseInt(formId));
    if (loadedForm) {
      form = loadedForm;
      renderFormPreview();
    } else {
      window.alert('Form not found!');
    }
  }
}

function deleteForm() {
  const formId = window.prompt('Enter form ID:');
  if (formId) {
    savedForms = savedForms.filter((form) => form.id !== parseInt(formId));
    localStorage.setItem('savedForms', JSON.stringify(savedForms));
    window.alert('Form deleted successfully!');
    renderFormList();
  }
}

function renderFormPreview() {
  const formPreviewHtml = `
    <form id="custom-form">
      ${form.fields
        .map((field, index) => {
          return `
            <div>
              <label>${field.label}</label>
              <input type="${field.type}" name="${field.name}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>
            </div>
          `;
        })
        .join('')}
      <button type="submit">Submit</button>
    </form>
  `;
  formPreview.innerHTML = formPreviewHtml;
  const customForm = document.getElementById('custom-form');
  customForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const webhookUrl = prompt("Enter the telex channel webhook url ")
    try {
      const formData = new FormData(customForm);
      const response = await fetch(`/submit-form?webhook=${webhookUrl}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      console.log(data);
  
      // Clear the form
      customForm.reset();
    } catch (error) {
      console.error(error);
    }
  });
  }
  function renderFormList() {
    const formListHtml = savedForms
      .map((form, index) => `<li>${form.name} (ID: ${form.id})</li>`)
      .join('');
    formList.innerHTML = formListHtml;
  }
  
  renderFormList();