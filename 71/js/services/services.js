const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-type': 'application/json'
        } 
    });

    return await res.json();
};

async function getResource(url) {    //функция получения данных карточек с сервера
    let res = await fetch(url);

    if(!res.ok) {       //обработка ошибки если нету ответа 
        throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

export {postData};
export {getResource};