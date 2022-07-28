'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-07-15T17:01:17.194Z',
    '2022-07-16T23:36:17.929Z',
    '2022-07-21T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
///Method
const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}
const calcDisplayBlance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
}
const calcDisplaySummary = (acc) => {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  const out = acc.movements.filter(mov => mov < 0).reduce((acc, arr) => acc + arr, 0);
  const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate) / 100).filter(int => int >= 1).reduce((acc, arr) => acc + arr)
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
}
const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const datsPasse = calcDaysPassed(new Date, date);
  // console.log(datsPasse)

  if (datsPasse === 0) return 'Today';
  if (datsPasse === 1) return 'Yesterday';
  if (datsPasse <= 7) return `${datsPasse} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const years = date.getFullYear();
    // return `${day}/${month}/${years}`
    return Intl.DateTimeFormat(locale).format(date)
  }
}

const displayMovements = (acc, sort = false) => {

  containerMovements.innerHTML = '';

  const movs = sort ?
    acc.movements.slice().sort((a, b) => a - b) :
    acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    let displayDate = '';
    if (acc.movementsDates) {
      const date = new Date(acc.movementsDates[i]);
      displayDate = formatMovementDate(date, acc.locale);
    }
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `<div class="movements">
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterend', html)
  });
  const index = movs.forEach((mov, i) => {
    console.log(i)
  });
  console.log(index)
};

const createUsername = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })
}
createUsername(accounts);
const UpdateUI = (acc) => {
  //Display movements
  displayMovements(acc);
  //Display balance
  calcDisplayBlance(acc);
  //Display summary
  calcDisplaySummary(acc);
};
const startLogOutTimer = () => {
  let time = 120;
  //set time to 5 mintes
  const tick = (() => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //in each call, print the remaining time to ui
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(Timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `log in to get started`;
    }
    time--;
  });

  //call this time every second
  tick();
  const Timer = setInterval(tick, 1000);
  return Timer;
  //when - seconds,stop timer and log out user 

}

//event handler(Login)
let currentAccount, Timer;

//FAKE ALWAYS LOGGED IN

// currentAccount = account1;
// UpdateUI(currentAccount);
// containerApp.style.opacity = 100;

//Experimenting API
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'short'
}
const locale = navigator.language
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now)


btnLogin.addEventListener('click', (e) => {
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currentAccount?.pin === +(inputLoginPin.value)) {
    // console.log(accounts)
    //Display UI and message
    labelWelcome.textContent = `Welcom back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    //clera input fields;
    inputLoginUsername.value = inputLoginPin.value = '';
    //create current date and time;
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'short'
    }
    const locale = navigator.language
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
    if (Timer) clearInterval(Timer);
    Timer = startLogOutTimer();

    inputLoginPin.blur();
    //Update UI
    UpdateUI(currentAccount)
  }
});
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = +(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (amount > 0 &&
    receiverAcc &&
    currentAccount?.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {

    //Doing the transfor
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount)
    // ADD transfer DATE
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //update UI
    UpdateUI(currentAccount);
    //Reset timer 
    clearInterval(Timer);
    Timer = startLogOutTimer();
  }
});
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Math.floor(+(inputLoanAmount.value));
  // console.log(currentAccount)
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      UpdateUI(currentAccount);
    }, 2500)

  };
  inputLoanAmount.value = '';

  clearInterval(Timer);
  Timer = startLogOutTimer();
})
btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  // console.log('delete')
  // console.log(currentAccount)
  if (inputCloseUsername.value === currentAccount.username && +(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    // console.log(index);
    accounts.splice(index, 1);
    // console.log(accounts)
    containerApp.style.opacity = 0;
  }
  //clera input fields;
  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted
})

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
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

//Some,every Method
//some 透過給定函示,測試陣列中是否至少有一個元素,通過該函式所實作的測試, 回傳值會是布林值
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// //EQUALITY
// console.log(movements.includes(-130));

// //CONDITION
// console.log(movements.some(mov => mov === -130));

// const anyDeposits = movements.some(mov => mov > 1500);
// console.log(anyDeposits)

// // EVERY 
//會測試陣列中的所有數值是否通過給定的條件
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov >0 ));

//separate callback  單純回摳
// const deposit = mov => mov>0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit))

//flat & flatMap Method
//flat將数组扁平化,把一個具有多層嵌套的數組提取成只有一層的數組
// const arr = [[1, [2, 3]], [4, 5, 6], 7, 8];
// console.log(arr.flat(2));

//ex.
// const accountMovements = accounts.map(acc=>acc.movements);
// console.log(accountMovements)
// const accountMovementsFlat = accountMovements.flat();
// console.log(accountMovementsFlat);
// const accountMovementsSum = accountMovementsFlat.reduce((arr,mov)=>arr+mov); 
// console.log(accountMovementsSum)

//也可以直接使用將map flat reduce 連接起來使用變成一個變數
// const accountMovementsSum = accounts.map(acc => acc.movements).flat().reduce((arr, mov) => arr + mov);
// console.log(accountMovementsSum)

//flatMap 是將map與flat混合再一起使用的函數
//首先使用映射函数(map)映射每个元素，然后将结果压缩成一个新数组。它与 map 连着深度值为 1 的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。

// //Sort Method
// //基本上他是將所有的東西都轉換成字串符號在進行排序
// // 排序標準下 -1=a>b 1=a<b 0=a=b
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// //Ascending 升幕排序
// console.log(movements.sort((a, b) => a > b ? 1 : -1))
// //Descending 降幕排序
// console.log(movements.sort((a, b) => a < b ? 1 : -1))
// //如果單純是單純比大小的話可以使用
// console.log(movements.sort((a, b) => a - b)); //升幕排序
// console.log(movements.sort((a, b) => b - a)); //降幕排序 

//fill Method 會將陣列中索引的第一個到最後一個的每個位置全部填入一個靜態的值。 大多用來初始化特地的大小數組
// const arr = [1,2,3,4,5,6,7];
// console.log(arr.fill(23, 2,6))
//如果要初始化二維陣列或數組
// const martix = Array(5).fill(0).map(() => Array(5).fill(0))
// console.log(martix)
//from Method
//from() 方法用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组。

//進階用法
// var transpose = function (A) {
//   console.log(A[0].length)
//   return Array.from({ length: A[0].length }, (_v, i) => A.map(v => v[i]))
// };
// console.log(transpose([[1,2,3], [4, 5, 6]]))



//給兩個陣列[1,2,3],[4,5,6] 輸入[1,3,5],[2,4,6]
// const arr1 = [1, 2, 3]
// const arr2 = [4, 5, 6]
// const newArr3 = []
// const newArr4 = []
// const sort111 = (arr1, arr2) => {
//   let newarr = arr1.concat(arr2)
//   for (const i of newarr) i % 2 != 0 ? newArr3.push(i) : newArr4.push(i);
// }
// sort111(arr1, arr2)
// console.log(newArr3)
// console.log(newArr4)
//水平垂直置中的方法
//1.display: inline-block
// 	vertical-align: middle
// 2.	display-flex //flex
// align-items(center) //水平置中
// justify-content(center) //垂直置中
// 3.position: relative
// top: 50%
// margin: 0 auto
// +transform(translateY(- 50%))
//vue生命週期
//befor
//vue跟react的差別
//元件傳遞方式

//Number 

// console.log(23 === 23.0);

// //binary base 2 - 0 1
// console.log(0.1 + 0.2);

// //Conversion 轉換
// console.log(Number('23'));
// //也可以寫成
// console.log(+'23');
//這是因為js看到+的時候會進行強制轉換類型 會將字串轉成數字

//Parsing  
// parseInt() 函式能將輸入的字串轉成整數。
// console.log(Number.parseInt('30px'));
// // parseFloat() 函数解析一个参数（必要时先转换为字符串）并返回一个浮点数。
// console.log(Number.parseFloat('23.2rem'))
// //chenk if value is nan
// console.log(Number.isNaN(20));
// console.log(Number.isNaN(+'20x'));
//checking if value is number
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));

// console.log(Number.isInteger(23));
// console.log(Number.isInteger(23/ 0))


// Math and rounding
// console.log(Math.max(5,19,23,11,2));
// console.log(math.mix(5,18))
//Max會找數字最大的數字並會強制將字串轉成數字，但不能將解析非數字的參數。
//Min會找數字最小的數字並會強制將字串轉成數字，但不能將解析非數字的參數。

//Random
//  const randomInt = (min, max)=>Math.trunc(Math.random() * (max - min - 1) + min);
// //randomInt 在指定值之间的随机数。这个值不小于min（有可能等于），并且小于（不等于）max。
//  console.log(randomInt(1,10));

//  //trunc 方法会将数字的小数部分去掉，只保留整数部分。
//  console.log(Math.trunc(23.3));

// //round會傳回四捨五入的值
// console.log(Math.round(23.3));
// console.log(Math.round(23.9));
// //ceil 無條件進入法
// console.log(Math.ceil(23.3));
// console.log(Math.ceil(23.9));
// //floor 無條件捨去法
// console.log(Math.floor(23.3));
// console.log(Math.floor(23.9));

// //rounding decimals
// console.log(2.7.toFixed(0));
// console.log(2.7)

//Operator 運算符號 

//用餘數判斷判斷是否為偶數 
// const isEven = n => n % 2 === 0;
// console.log(isEven(8));
// console.log(isEven(23));

//bigInt
//要创建BigInt，只需在整数的末尾追加n即可 也可以调用BigInt()构造函数
// console.log(102434n)

// create a DATE
// const now1 = new Date();

//operations with dates

// const future = new Date(2037,10,19,15,23);
// console.log(+future);
// // 格式化日期方式
// const calcDaysPassed = (date1 , date2) => Math.abs(date2 - date1)/(1000 * 60 * 60 * 24 );
//                                                                 //  毫秒   分   時   天
// const dat1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037,3,4));
// console.log(dat1);

//運用intl.numberFormat

const theArray = [1, 2, 3, 4, 5]

// 實現以下功能
// theArray.multiply();
// console.log(theArray); // [1, 2, 3, 4, 5, 1, 4, 9, 16, 25]

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.log = function () {
  console.log(this.name + ', age:' + this.age);
}
// / 以下不可修改 */

var nick = new Person('nick', 18);
var peter = new Person('peter', 20);
// console.log(nick.log)
console.log(nick.log === peter.log) // false
1.於面試前，請使用 Vue3製作一個網站展示AG-Grid的技術
2.說明 Client-Side Data 跟 Server-Side Data 的差別與使用時機
Client-Side Data 適用於處理大量的資料
sever-side data 僅在需要時進行更改
3.說明 Vue3 與 Vue2 差異
vue3 支援typescrip，生命週期使用setup代替了之前的beforeCreate和created
使用proxy代替defineProperty