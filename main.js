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
  getburgers() {
    return this.burgers;
  }
  getprofitPerClick() {
    return this.profitPerClick;
  }
  getProfitPerDat() {
    return this.profitPerDay;
  }
  getpurchasedItems() {
    return this.purchasedItems;
  }
}

class Item {
  constructor(name, type, maxNum, description, price, purchasedNum) {
    this.name = name;
    this.type = type;
    this.maxNum = maxNum;
    this.description = description;
    this.price = price;
    this.purchasedNum = purchasedNum;
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
  getpurchasedNum() {
    return this.purchasedNum;
  }
}

const itemList = [
  new Item("Flip Machine", "ability", 500, "+ ¥25 / click", 15000, 0),
  new Item("EFT Stock", "investment", Infinity, "+ 0.1 % / day", 300000, 0),
  new Item("EFT Bonds", "investment", Infinity, "+ 0.07 % / day", 300000, 0),
  new Item("Lemonade Stand", "investment", 1000, "+ ¥30 / day", 30000, 0),
  new Item("Ice Cream Truck", "investment", 500, "+ ¥120 / day", 100000, 0),
  new Item("House", "investment", 100, "+ ¥32,000 / day", 20000000, 0),
  new Item("Town House", "investment", 100, "+ ¥64,000 / day", 40000000, 0),
  new Item("Mansion", "investment", 20, "+ ¥500,000 / day", 250000000, 0),
  new Item(
    "Industrial Space",
    "investment",
    10,
    "+ ¥2,200,000 / day",
    1000000000,
    0
  ),
  new Item(
    "Hotel Skyscraper",
    "investment",
    5,
    "+ ¥25,000,000 / day",
    10000000000,
    0
  ),
  new Item(
    "Bullet-Speed Sky Railway",
    "investment",
    1,
    "+ ¥30,000,000,000 / day",
    10000000000000,
    0
  ),
];

// function initializeUserAccount() {
//   const form = document.getElementById("name-form");
//   let userAccount = new User(
//     form.querySelectorAll(`input[name="userName"]`).item(0).value,
//   );
//   console.log(userAccount);
// }

// function loadUserAccount(){

// }

function startGame() {
  const form = document.getElementById("name-form");
  let userAccount = new User(
    form.querySelectorAll(`input[name="userName"]`).item(0).value
  );
  console.log(userAccount);

  config.initialForm.classList.add("d-none");
  config.mainPage.classList.add(
    "bg-dark",
    "col-12",
    "text-center",
    "text-white"
  );
  config.mainPage.append(createMainPage(userAccount));
}

function createMainPage(user) {
  let container = document.createElement("div");
  container.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );

  let nameP = document.createElement("p");
  
}
