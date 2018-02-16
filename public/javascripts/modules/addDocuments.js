function addDocuments(schoolInput, programInput, courseInput){
  if (!schoolInput) return;

  schoolInput.onchange = function(){
    programInput.disabled = false;
  }

  programInput.onchange = function(){
    courseInput.disabled = false;
  }


}


export default addDocuments;