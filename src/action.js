export const fetchData = async page => {
  try {
    const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=3ea267b080ab0b3beccefd9db1750c02&language=en-US&page=${page}`;
    const data = await fetch(url);
    const res = await data.json();

    let maskName = res.results.map((el, i) => {
      let maskedName = el.name;
      for (let i = 0; i < el.name.length / 2; i++) {
        const rndInt = Math.floor(Math.random() * el.name.length) + 0;
        if (el.name[rndInt] !== " " && /^[a-zA-Z]+$/.test(el.name[rndInt]))
          maskedName = maskedName.replace(el.name[rndInt], "_");
      }

      return {
        maskedName: maskedName.toLowerCase().split(""),
        originalName: el.name.toLowerCase().split(""),
        fakeName: maskedName.toLowerCase().split(""),
        overview: el.overview.toLowerCase(),
        page: res.page,
        total_pages: res.total_pages,
        isComplete: false,
        isHint: false
      };
    });

    return maskName;
  } catch (e) {
    throw new Error("fetch problem");
  }
};

export const getCurrentCell = (index, arrData) => {
  //   index = index + 1;
  const newArr = [...arrData];
  console.log(newArr[index].name);
  console.log(index);
  return newArr[index].name.toLowerCase();
};

export const getCurrentHint = (index, arrData) => {
  const newArr = [...arrData];
  return newArr[index].overview;
};

export const getMasked = (arrData, index) => {
  const newArr = [...arrData];
  console.log(newArr, "sds");
  const masked = maskName(newArr[index].name.toLowerCase());
  return masked;
};

export const maskName = val => {
  let maskedName = val;
  for (let i = 0; i < val.length / 2; i++) {
    const rndInt = Math.floor(Math.random() * val.length) + 0;
    if (val[rndInt] !== " " && /^[a-zA-Z]+$/.test(val[rndInt]))
      maskedName = maskedName.replace(val[rndInt], "_");
  }

  return maskedName;
};

export const isEqual = (arrCompletion, index) => {
  return arrCompletion[index].isComplete === true;
};
