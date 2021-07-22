const config = {
  initialForm: document.getElementById("initial-form"),
  mainPage: document.getElementById("main-page"),
};

class User {
  constructor(
    name,
    age = 20,
    days = 0,
    money = 50000,
    burgers = 0,
    profitPerClick = 25,
    profitPerDay = 0,
    purchasedItems = {}
  ) {
    this.name = name;
    this.age = age;
    this.days = days;
    this.money = money;
    this.burgers = burgers;
    this.profitPerClick = profitPerClick;
    this.profitPerDay = profitPerDay;
    this.purchasedItems = purchasedItems;
  }

  //getter methods
  getName() {
    return this.name;
  }
  getAge() {
    return this.age;
  }
  getDays() {
    return this.days;
  }
  getMoney() {
    return this.money;
  }
  getBurgers() {
    return this.burgers;
  }
  getprofitPerClick() {
    return this.profitPerClick;
  }
  getProfitPerDay() {
    return this.profitPerDay;
  }
  getPurchasedItems() {
    return this.purchasedItems;
  }
}

class Item {
  constructor(name, type, maxNum, description, price, purchasedNum, image) {
    this.name = name;
    this.type = type;
    this.maxNum = maxNum;
    this.description = description;
    this.price = price;
    this.purchasedNum = purchasedNum;
    this.image = image;
  }

  //getter methods
  getName() {
    return this.name;
  }
  getType() {
    return this.type;
  }
  getMaxNum() {
    return this.maxNum;
  }
  getDescription() {
    return this.description;
  }
  getPrice() {
    return this.price;
  }
  getPurchasedNum() {
    return this.purchasedNum;
  }
  getImage(){
    return this.image;
  }
}

const itemList = [
  new Item(
    "Flip Machine",
    "ability",
    500,
    "+ ¥25 / click",
    15000,
    0,
    "https://cdn.pixabay.com/photo/2015/12/08/00/24/grilling-1081675_960_720.jpg"
  ),
  new Item(
    "EFT Stock",
    "investment",
    Infinity,
    "+ 0.1 % / day",
    300000,
    0,
    "https://cdn.pixabay.com/photo/2016/12/13/22/15/chart-1905225_960_720.jpg"
  ),
  new Item(
    "EFT Bonds",
    "investment",
    Infinity,
    "+ 0.07 % / day",
    300000,
    0,
    "https://cdn.pixabay.com/photo/2016/12/13/22/15/chart-1905225_960_720.jpg"
  ),
  new Item(
    "Lemonade Stand",
    "investment",
    1000,
    "+ ¥30 / day",
    30000,
    0,
    "https://cdn.pixabay.com/photo/2018/07/12/21/59/drink-3534434_960_720.jpg"
  ),
  new Item(
    "Ice Cream Truck",
    "investment",
    500,
    "+ ¥120 / day",
    100000,
    0,
    "https://cdn.pixabay.com/photo/2020/06/29/17/10/ice-cream-5353446_960_720.jpg"
  ),
  new Item(
    "House",
    "investment",
    100,
    "+ ¥32,000 / day",
    20000000,
    0,
    "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_960_720.jpg"
  ),
  new Item(
    "Town House",
    "investment",
    100,
    "+ ¥64,000 / day",
    40000000,
    0,
    "https://cdn.pixabay.com/photo/2018/01/31/12/16/architecture-3121009_960_720.jpg"
  ),
  new Item(
    "Mansion",
    "investment",
    20,
    "+ ¥500,000 / day",
    250000000,
    0,
    "https://cdn.pixabay.com/photo/2017/08/06/06/53/urban-2589645_960_720.jpg"
  ),
  new Item(
    "Industrial Space",
    "investment",
    10,
    "+ ¥2,200,000 / day",
    1000000000,
    0,
    "https://cdn.pixabay.com/photo/2015/09/19/16/04/factory-947425_960_720.jpg"
  ),
  new Item(
    "Hotel Skyscraper",
    "investment",
    5,
    "+ ¥25,000,000 / day",
    10000000000,
    0,
    "https://cdn.pixabay.com/photo/2016/12/23/18/28/singapore-1927720_960_720.jpg"
  ),
  new Item(
    "Bullet-Speed Sky Railway",
    "investment",
    1,
    "+ ¥30,000,000,000 / day",
    10000000000000,
    0,
    "https://cdn.pixabay.com/photo/2020/05/30/01/03/shinkansen-5237269_960_720.jpg"
  ),
];

function initializeUserAccount() {
  const form = document.getElementById("name-form");
  let userAccount = new User(
    form.querySelectorAll(`input[name="userName"]`).item(0).value
  );
  console.log(userAccount);
}

function loadUserAccount() {}

function startGame() {
  const form = document.getElementById("name-form");
  let userAccount = new User(
    form.querySelectorAll(`input[name="userName"]`).item(0).value
  );
  console.log(userAccount);

  config.initialForm.classList.add("d-none");
  config.mainPage.classList.add(
    "bg-gray",
    "col-12",
    "text-center",
    "text-white",
    "h-75"
  );
  config.mainPage.append(createMainPage(userAccount));
}

function createMainPage(user) {
  let container = document.createElement("div");
  container.classList.add("d-flex", "justify-content-between", "h-100");

  container.append(createLeftCon(user), createRightCon(user));

  console.log(container);
  return container;
}

function createLeftCon(user) {
  let leftCon = document.createElement("div");
  leftCon.classList.add(
    "bg-navy",
    "col-5",
    "d-flex",
    "flex-column",
    "align-items-center",
    "py-3",
    "my-3"
  );

  let burgers = user.getBurgers();
  let profitPerClick = user.getprofitPerClick();
  let profitPerDay = user.getProfitPerDay();

  leftCon.innerHTML = `
    <div class="bg-gray col-3 mw-100 mb-3 d-flex flex-column align-items-center py-2">
      <div class="col-4 mw-100 d-flex align-items-center justify-content-center">
        <h4>${burgers} Burgers</h4>
      </div>
      <div class="col-4 mw-100 d-flex align-items-center justify-content-center">
        <p>¥${profitPerClick} / click</p>
      </div>
      <div class="col-4 mw-100 d-flex align-items-center justify-content-center">
        <p>¥${profitPerDay} / day</p>
      </div>
    </div>
    <div class="col-9 d-flex justify-content-center align-items-center mw-100">
      <img class="pic hover" src="https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_960_720.png" alt="burger">
    </div>
  `;

  return leftCon;
}

function createRightCon(user) {
  let rightCon = document.createElement("div");
  rightCon.classList.add(
    "col-7",
    "d-flex",
    "flex-column",
    "align-items-center",
    "my-3",
    "pr-0",
    "overflow-hidden"
  );
  rightCon.append(
    createUserInfoCon(user),
    createItemTableCon(user),
    createButtonsCon()
  );
  return rightCon;
}

function createUserInfoCon(user) {
  let userInfoCon = document.createElement("div");
  userInfoCon.classList.add(
    "bg-navy",
    "col-3",
    "mw-100",
    "p-2",
    "mb-3",
    "d-flex",
    "flex-column",
    "align-items-center",
    "mw-100"
  );

  let name = user.getName();
  let age = user.getAge();
  let days = user.getDays();
  let money = user.getMoney();

  userInfoCon.innerHTML = `
    <div class="col d-flex justify-content-between mw-100 px-0 mb-2">
      <div class="col bg-gray text-center d-flex flex-column justify-content-center mr-2">
        <p>${name}</p>
      </div>
      <div class="col bg-gray text-center d-flex flex-column justify-content-center">
        <p>${age}</p>
      </div>
    </div>
    <div class="col d-flex justify-content-between mw-100 px-0">
      <div class="col bg-gray text-center d-flex flex-column justify-content-center mr-2">
        <p>${days}</p>
      </div>
      <div class="col bg-gray text-center d-flex flex-column justify-content-center">
        <p>${money}</p>
      </div>
    </div>
  `;

  return userInfoCon;
}

function createItemTableCon() {
  let itemTableCon = document.createElement("div");
  itemTableCon.classList.add(
    "bg-navy",
    "col-7",
    "mw-100",
    "p-2",
    "overflow-auto"
  );

  for (let i = 0; i < itemList.length; i++) {
    let item = itemList[i];
    let image = item.getImage();
    let name = item.getName();
    let price = item.getPrice();
    let description = item.getDescription();

    itemTableCon.innerHTML +=`
      <div class="d-flex flex-column align-items-center">
        <div class="col bg-gray d-flex justify-content-between align-items-center mb-2 hover-outline pl-2">
          <div class="col-3 px-0 py-2">
            <img class="pic-item" src=${image} alt=${name}>
          </div>
          <div class="col-8 d-flex flex-column align-items-between justify-content-around text-left py-2">
            <h3>${name}</h3>
            <div class="d-flex flex-column align-items-between">
              <p class="col-12 pl-0">$${price}</p>
              <p class="col-12 text-green pl-0">${description}</p>
            </div>
          </div>
          <div class="col-1 d-flex align-items-center">
            <h3>5</h3>
          </div>
        </div>
      </div>
    `;
  }

  return itemTableCon;
}

//         <!-- item-list -->
//         <div class="d-flex flex-column align-items-center">
//           <div class="col bg-gray d-flex justify-content-between mb-2 hover-outline pl-2">
//             <div class="col-3 px-0 py-2">
//               <img class="pic-item" src="https://cdn.pixabay.com/photo/2015/12/08/00/24/grilling-1081675_960_720.jpg" alt="flip machine">
//             </div>
//             <div class="col-8 d-flex flex-column align-items-between justify-content-center text-left">
//               <h3>Flip Machine</h3>
//               <div class="d-flex justify-content-between">
//                 <p class="col-4 pl-0">$10,000</p>
//                 <p class="col-8 text-green pl-0">+ $25 / click</p>
//               </div>
//             </div>
//             <div class="col-1 d-flex align-items-center">
//               <h3>5</h3>
//             </div>
//           </div>
//         </div>

function createButtonsCon() {
  let buttonsCon = document.createElement("div");
  buttonsCon.classList.add(
    "col-2",
    "mw-100",
    "d-flex",
    "justify-content-end",
    "align-items-center",
    "pr-0"
  );
  buttonsCon.innerHTML = `
    <div class="col-2 border border-white py-2 mr-3 hover hover-outline">
      <i class="fas fa-redo-alt fa-2x"></i>
    </div>
    <div class="col-2 border border-white py-2 hover hover-outline">
      <i class="fas fa-save fa-2x"></i>
    </div>
  `;
  return buttonsCon;
}

// <!-- 2ページ目（メインのページ） -->
// <div id="main-page" class="bg-gray col-12 text-center text-white h-75">
//   <div
//     id="container"
//     class="d-flex justify-content-between h-100"
//   >
//     <div class="bg-navy col-5 d-flex flex-column align-items-center py-3 my-3">
//       <div class="bg-gray col-3 mw-100 mb-3 d-flex flex-column align-items-center">
//         <div class="col-4 mw-100 d-flex align-items-center justify-content-center">
//           <h4>100 Burgers</h4>
//         </div>
//         <div class="col-4 mw-100 d-flex align-items-center justify-content-center">
//           <p>¥25 / click</p>
//         </div>
//         <div class="col-4 mw-100 d-flex align-items-center justify-content-center">
//           <p>¥10,000 / day</p>
//         </div>
//       </div>
//       <div class="col-9 d-flex justify-content-center align-items-center mw-100">
//         <img class="pic hover" src="https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_960_720.png" alt="burger">
//       </div>
//     </div>
//     <div class="col-7 d-flex flex-column align-items-center my-3 pr-0">
//       <div class="bg-navy col-3 mw-100 p-2 mb-3 d-flex flex-column align-items-center mw-100">
//         <div class="col d-flex justify-content-between mw-100 px-0 mb-2">
//           <div class="col bg-gray text-center d-flex flex-column justify-content-center mr-2">
//             <p>User name</p>
//           </div>
//           <div class="col bg-gray text-center d-flex flex-column justify-content-center">
//             <p>User name</p>
//           </div>
//         </div>
//         <div class="col d-flex justify-content-between mw-100 px-0">
//           <div class="col bg-gray text-center d-flex flex-column justify-content-center mr-2">
//             <p>User name</p>
//           </div>
//           <div class="col bg-gray text-center d-flex flex-column justify-content-center">
//             <p>User name</p>
//           </div>
//         </div>
//       </div>
//       <div id="item-table" class="bg-navy col-7 mw-100 p-2 overflow-auto">
//         <!-- item-list -->
//         <div class="d-flex flex-column align-items-center">
//           <div class="col bg-gray d-flex justify-content-between mb-2 hover-outline pl-2">
//             <div class="col-3 px-0 py-2">
//               <img class="pic-item" src="https://cdn.pixabay.com/photo/2015/12/08/00/24/grilling-1081675_960_720.jpg" alt="flip machine">
//             </div>
//             <div class="col-8 d-flex flex-column align-items-between justify-content-center text-left">
//               <h3>Flip Machine</h3>
//               <div class="d-flex justify-content-between">
//                 <p class="col-4 pl-0">$10,000</p>
//                 <p class="col-8 text-green pl-0">+ $25 / click</p>
//               </div>
//             </div>
//             <div class="col-1 d-flex align-items-center">
//               <h3>5</h3>
//             </div>
//           </div>
//         </div>
//         <!-- purchase-window -->
//         <!-- <div class="item-window bg-gray d-flex flex-column align-items-center justify-content-around">
//           <div class="col-6 d-flex align-items-center mw-100 px-0">
//             <div class="col-7 d-flex flex-column align-items-start text-left">
//               <h3>Flip Machine</h3>
//               <p>Max Purchases: 500</p>
//               <p>Price: ¥15,000</p>
//               <p>Get 25 extra yen per second</p>
//             </div>
//             <div class="col-5">
//               <img class="pic-item" src="https://cdn.pixabay.com/photo/2015/12/08/00/24/grilling-1081675_960_720.jpg" alt="flip machine">
//             </div>
//           </div>
//           <form class="col-6 mw-100">
//             <div class="form-group text-left mb-1">
//               <label for="numOfPurchase">How many would you like to purchase?</label>
//               <input type="number" class="form-control text-right" id="numOfPurchase" value="0">
//             </div>
//             <p class="text-right">Total: ¥30,000,000</p>
//             <div class="d-flex justify-content-between py-2">
//               <button class="col btn btn-outline-primary btn-bg-white mr-2">Go Back</button>
//               <button class="col btn btn-primary">Purchase</button>
//             </div>
//           </form>
//         </div> -->
//       </div>
//       <div class="col-2 mw-100 d-flex justify-content-end align-items-center pr-0">
//         <div class="col-2 border border-white py-2 mr-3 hover hover-outline"><i class="fas fa-redo-alt fa-2x"></i></div>
//         <div class="col-2 border border-white py-2 hover hover-outline"><i class="fas fa-save fa-2x"></i></i></div>
//       </div>
//     </div>
//   </div>
// </div>
