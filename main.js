/**
 *  Задача: Необходимо разработать функцию deepEqual, которая будет проводить глубокое сравнение между 
 * переданными объектами a_pActual и a_pExpected. Под глубоким сравнением понимается то, что собственные
 * свойства дочерних объектов также рекурсивно сравниваются. Если объекты не идентичны, вывести ошибку 
 * с путем до неидентичного свойства 
 */

const mokeObj1 = {
	a: {
		b: 1,
	}
};
const mokeObj2 = {
	a: {
		b: 2,
	}
};
const mokeObj3 = {
	a: {
		b: 1,
	}
};
  
const deepEqual = (a_pActual, a_pExpected, a_strPath = '$') => {
    // Проверка на идентичность типов данных
    if (typeof a_pActual !== typeof a_pExpected) 
	{
        console.error(`Type mismatch at ${a_strPath}: a_pExpected ${typeof a_pExpected}, got ${typeof a_pActual}`);
        return false;
    }
    // Проверка на итерируемые объекты (массивы и объекты)
    if (typeof a_pActual === 'object' && a_pActual !== null && a_pExpected !== null) 
	{
        const keysA = Object.keys(a_pActual);
        const keysE = Object.keys(a_pExpected);

        // Проверка на одинаковое количество свойств
        if (keysA.length !== keysE.length) 
		{
            console.error(`Property count mismatch at ${a_strPath}: a_pExpected ${keysE.length}, got ${keysA.length}`);
            return false;
        }

        // Рекурсивная проверка свойств
        for (const key of keysA) 
		{
            if (!a_pExpected.hasOwnProperty(key)) 
			{
                console.error(`Property ${a_strPath}.${key} is missing in a_pExpected object`);
                return false;
            }

            if (!deepEqual(a_pActual[key], a_pExpected[key], `${a_strPath}.${key}`))
                return false;
        }
        return true;
    }
    // Простая проверка на равенство
    if (a_pActual !== a_pExpected) 
	{
        console.error(`Value mismatch at ${a_strPath}: a_pExpected ${a_pExpected}, got ${a_pActual}`);
        return false;
    }

    return true;
};


console.log(deepEqual(mokeObj1, mokeObj1));
console.log(deepEqual(mokeObj1, mokeObj2));
console.log(deepEqual(mokeObj1, mokeObj3));

