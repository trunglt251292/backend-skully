export async function handlerMessager(data) {
  try{
    console.log('Handling........');
    data = JSON.parse(data);
    switch (data.type){
      case "exam":
        await handleExam(data.data);
        break;
      default:
        break;
    }
  }catch (err){
    console.log('err handlerMessager :',err);
  }
}

async function handleExam(data) {
  try{
    console.log('Data received : ',data);
  }catch (err){
    console.log('err : ',err);
  }
}