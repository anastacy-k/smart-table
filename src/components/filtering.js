import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
        .forEach((elementName) => {                         // Перебираем по именам
            elements[elementName].append(                   // в каждый элемент добавляем опции
                ...Object.values(indexes[elementName])      // формируем массив имён, значений опций
                    .map(name => {
                        // Создаём элемент option
                        const option = document.createElement('option');
                        option.value = name;                // Устанавливаем значение
                        option.textContent = name;          // Устанавливаем текстовое содержимое
                        return option;                      // Возвращаем созданный элемент
                    })
            )
        });
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action?.name === 'clear') {
            action.parentNode.querySelector('input').value = ''
            state[action.dataset.field] = ''
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}