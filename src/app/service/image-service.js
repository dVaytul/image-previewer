import DATA from "../gallery/DATA.json";

const data = DATA; //load data from JSON file; must be AJAX query

let images = {
  all: data,
  current: 33,
  nextStep: 20,
  last: false
};

let getInitialData = () => images.all.slice(0, images.current);

let getNextData = () => {
  if(!images.last){
    for (let i = 0; i < images.nextStep; i++) {
      if(images.current < images.all.length){
        images.current++;
      }
      else {
        images.last = true;
        images.current = images.all.length; //unnecessary
        i = images.nextStep;    //or continue ??
      }
    }
    return images.all.slice(0, images.current);
  }
  return images.all;
};

let resetData = () => images.current = 33;

let addImageToData = (image) => {
  images.all.unshift(image);
  images.current++;
};

export default {
  getInitialData,
  getNextData,
  resetData,
  addImageToData
}


