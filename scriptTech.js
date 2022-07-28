/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// currencies.forEach((value,key, map)=>{
// console.log(`${key}:${value}`)
// })
// const curreniceUnique = new Set(['USD','EUR','GBP','EUR']);
//  console.log(curreniceUnique);
//  curreniceUnique.forEach((value, _, map)=>{
//   console.log(`${value} :${value}`)
//  });
//set與map不同在於初始化的值不同,map需要二維數組,set需要array陣列,都不允許重複,
//map的key不能修改,對應的值可以修改;
//set不能透過迭代器改變值,因set的值就是key;
//map的鍵值是絕對的存在,值也不作為key,set沒有value only key,value is key;
//set可以用來去除重複的值,是目前最快的運行方法
// ＿代表是一次性變量,也代表是一個不重要的變量
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// //for of 
// // for(const movement of movements)
// //entries會回傳陣列中的索引跟鍵值
// const iterator = movements.entries();
// for(let e of iterator){
//   console.log(e)
// }
// for(const [i,movement] of movements.entries())
// {
//   if(movement > 0){
//     console.log(`Movement ${i+1}:You deposited ${movement}`)
//   }else{
//     console.log((`Movement ${i+1}:You withdrew ${Math.abs(movement)}`))
//   }
// }
// console.log('----- FOREACH ------')
// //foreach
// //會將陣列的每個元素街傳入指定的函式一次
// //語法 forEach(currentValue,index,array)
//currentValue當前處理的值 index索引 array被遍歷的數組 
// /////////////////////////////////////////////////
// movements.forEach((mov,i,arr)=>{
//   if(mov > 0){
//     console.log(`Movement ${i+1}:You deposited ${mov}`)
//   }else{
//     console.log((`Movement ${i+1}:You withdrew ${Math.abs(mov)}`))
//   }
// })
//FORECAH動作解析
//0:function(200)
//1:function(400)
//2:function(400)
//.....
//for of與foreach使用時機
//如果需要使用break或continue跳出循環使用for of迴圈ㄝ,如果不需要則反之

// let arr = ['a', 'b', 'c', 'd', 'e'];
//SLICE
//會回傳一個新的陣列物件,為原陣列的選擇begin-end(不含end)
//語法:arr.slice(begin,end)
// console.log(arr.slice(2))
// console.log(arr.slice(2, 4))
// console.log(arr.slice(-2))
// console.log(arr.slice(-1))
// console.log(arr.slice(1, -2))
// console.log(arr.slice())
// console.log([...arr])

//SPLICE
//可以刪除既有的元素,也可加入新元素改變陣列內容
//語法：array.slice(start,deleteCount,item1.....)
// console.log('原數組: ' + arr)
// console.log('將最後一個的值 splice掉 ' + arr.splice(-1))
// console.log('結果 ' + arr)
// console.log('將中間的C,D splice掉 ' + arr.splice(1, 2))
// console.log('結果 ' + arr)
// console.log('新增數字' + arr.splice(1, 0, 5))
// console.log('結果 ' + arr)

//REVERSE 反轉 如字面所述 將陣列的數值反轉
// arr = ['a','b','c','d','e']
// const arr2=['j','i','h','g','f']
// console.log(arr2.reverse())
// console.log(arr)
//如果不想改變原始陣列的方式,上述的方法都不能用

//CONCAT 多被用來合併兩個或多個陣列,不會改變原有的陣列而是回傳一新陣列
// const letters = arr.concat(arr2)
// console.log(letters)
// console.log([...arr,...arr2])//spread運算符

//JOIN
//會將陣列中的元素全部合併成一個字串並回傳
// console.log(letters.join('-'))


// Coding Challenge #1
/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = (dogsJulia, dogsKate) => {
//   const dogsJuliaCreate = dogsJulia.slice(1, 3)
//   //  console.log(dogsJuliaCreate)
//   const dogs = dogsKate.concat(dogsJuliaCreate)
//   console.log(dogs)
//   dogs.forEach((dog, i) => {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old"`)
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`)
//     }
//   })
// }
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])

//Map Method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;
// const movementsUSD = movements.map(mov => mov * eurToUsd);
// // console.log(movementsUSD)
// const movementsDescriptions = movements.map((mov, i) => `movements ${i + 1} : you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`)
// console.log(movementsDescriptions)


//filter Method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposits = movements.filter(mov => mov > 0);
// //另一種表現for of
// const depositFor = [];
// for (const mov of movements)if(mov>0)depositFor.push(mov)
// // console.log(depositFor)
// const withdrawal = movements.filter(mov => mov < 0 )
// console.log(withdrawal)

// reduce Method
//可作為累加器 還有其他功能可使用 詳述在改
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const balance = movements.reduce((acc, cur, i, arr) => acc + cur, 0);
//箭頭函式如果只有一航程式碼的話 不使用{}
// console.log(`iteartion ${i}:${acc}`)
// console.log(movements);
// console.log(balance);
// //另一種表現for of
// let balance2 = 0
// for (const mov of movements) balance2 += mov
// console.log(`balace2:${balance2}`)
//也可做取最大值或最小值
// const max = movements.reduce((arr, cur) => {
//   if (arr > cur) { return arr } else { return cur }
// },movements[0])
// console.log(max)
//如果只需要一個循環可使用for of 但如果有多個循環做多個運算時 使用map filter reduce 會比較恰當
// 因為上述方法都是return回變數或值 也不需要額外設立一個值接收


// Coding Challenge #2

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = (ages) => {

//   const humanAge = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4)
//   console.log(humanAge)
//   const adults = humanAge.filter((age => age >= 18))
//   console.log(adults)
//   const average = adults.reduce((acc, age, i, arr) => acc+age / arr.length,0)
//   console.log(average.toFixed(2))
// }

// const calcAverageHumanAge = ages => 
//   ages.map(age => age <= 2 ? 2 * age : 16 + age * 4).filter((age => age >= 18)).reduce((acc, age, i, arr) => acc+age / arr.length,0);


// const arr1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
// const arr2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])


//mix map,filter,reduce Method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map((mov, _, arr) => {
//     // console.log(arr)
//     return mov * eurToUsd
//   }).
//   reduce((acc, mov, _, arr) => {
//     // console.log(arr)
//     return acc + mov
//   }, 0)
// console.log(totalDepositsUSD)

//如果要檢查totalDepositsUSD的數值是否錯誤 可以使用函數內的arr檢查