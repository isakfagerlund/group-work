const axios = require("axios");

function selectOptionResults(array) {
  return array
    .map(item => {
      return `
    <option value="${item._id}" >${item.name}</option>
    `;
    })
    .join("");
}

function addDocuments(schoolInput, programInput, courseInput) {
  if (!schoolInput) return;

  // get Program options
  schoolInput.onchange = function() {
    const schoolId = this.value;

    axios.get(`/api/programs?id=${schoolId}`).then(res => {
      const options = selectOptionResults(res.data);
      programInput.innerHTML =
        `<option value="" disabled selected>Select Program</option>` + options;
      programInput.disabled = false;
    });
  };

  // get Course options
  programInput.onchange = function() {
    const programId = this.value;

    axios.get(`/api/courses?id=${programId}`).then(res => {
      const options = selectOptionResults(res.data);
      courseInput.innerHTML =
        `<option value="" disabled selected>Select Course</option>` + options;
    });

    courseInput.disabled = false;
  };
}

export default addDocuments;
