function calc(){
    const result = document.querySelector('.calculating__result span'); //эл-нт записи результата
    let sex = 'female', height, weight, age, ratio; //переменные(пол, рост, вес, возраст, коэф-нт)

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }else{
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    
    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    }else{
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }

    function calcTotal() {                                  //ф-я подсчёта
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;     //завершает работу функции если нету одного из значений
        }

        if(sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age )) * ratio);
        } else{
            result.textContent = Math.round((88.36 + (13.4 *weight) + (4.8 *height) - (5.7 *age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(selector, activeClass){         //ф-я всех переключателей, без делегирования событий 
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')){    //проверка на присутствие атрибута data-ratio
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);     //удаляем классы активности у всех эл-в
                });
    
                e.target.classList.add(activeClass);        //добавляем класс активности нужному эл-ту
    
                calcTotal();     //должна вызываться в конце всех событий input, чтобы динамически обновлялась информация о ккал
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector){     //ф-я получения данных со всех input
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else{
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')){  //switch-case по атрибуту id
                case 'height':
                    height = +input.value;
                    break;  
                case 'weight':
                    weight = +input.value;
                break;  
                case 'age':
                    age = +input.value;
                break;                
            }
            calcTotal();
        });
        
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

export default calc;