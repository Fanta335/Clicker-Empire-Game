const config = {
  initialForm: document.getElementById("initial-form"),
  mainPage: document.getElementById("main-page"),
};

class User {
  constructor(
    name,
    age = 20,
    days = 0,
    money = 5000000000000,
    burgers = 0,
    profitPerClick = 25,
    profitPerDay = 0,
    purchasedItems = []
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
  getProfitPerClick() {
    return this.profitPerClick;
  }
  getProfitPerDay() {
    return this.profitPerDay;
  }
  getPurchasedItems() {
    return this.purchasedItems;
  }

  //setter methods
  updateProfitPerClick(profit) {
    this.profitPerClick += profit;
  }

  updateProfitPerDay(profit) {
    this.profitPerDay += profit;
  }

  purchaseItem(item, num) {
    if (num === 0) return;

    if (item.getName() === "EFT Stock") {
      let profit =
        Math.floor(item.getPrice() * Math.pow(1 + 0.1, num)) - item.getPrice();
      item.updatePrice(0.1, num);
      this.updateProfitPerDay(
        Math.floor((profit * item.getDescription()) / 10)
      );
      this.money -= item.getPrice() * num;
      item.updatePurchasedNum(num);
      return;
    }

    this.money -= item.getPrice() * num;
    item.updatePurchasedNum(num);

    let type = item.getType();
    if (type === "ability") {
      this.updateProfitPerClick(item.getDescription() * num);
    } else if (type === "investment") {
      this.updateProfitPerDay(
        Math.floor((item.getDescription() / 100) * item.getPrice() * num)
      );
    } else {
      this.updateProfitPerDay(item.getDescription() * num);
    }
  }

  makeMoney(amount) {
    this.money += amount;
  }

  makeBurger() {
    this.burgers++;
  }

  setDays() {
    this.days++;
  }

  setAge() {
    this.age++;
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
  getImage() {
    return this.image;
  }

  //setter mothods
  updatePrice(rate, num) {
    let diff = Math.floor(this.price * Math.pow(1 + rate, num)) - this.price;
    this.price += diff;
    return this.price;
  }
  updatePurchasedNum(num) {
    if (this.purchasedNum === this.maxNum) {
      alert("Out of stock! Thank you!");
      return;
    } else if (this.purchasedNum + num > this.maxNum) {
      alert(`No more stock! Please put less number.`);
      return;
    }
    this.purchasedNum += num;
  }
}

const itemList = [
  new Item(
    "Flip Machine",
    "ability",
    500,
    25,
    15000,
    0,
    "https://cdn.pixabay.com/photo/2015/12/08/00/24/grilling-1081675_960_720.jpg"
  ),
  new Item(
    "EFT Stock",
    "investment",
    Infinity,
    0.1,
    300000,
    0,
    "https://cdn.pixabay.com/photo/2016/12/13/22/15/chart-1905225_960_720.jpg"
  ),
  new Item(
    "EFT Bonds",
    "investment",
    Infinity,
    0.07,
    300000,
    0,
    "https://cdn.pixabay.com/photo/2016/12/13/22/15/chart-1905225_960_720.jpg"
  ),
  new Item(
    "Lemonade Stand",
    "realEstate",
    1000,
    30,
    30000,
    0,
    "https://cdn.pixabay.com/photo/2018/07/12/21/59/drink-3534434_960_720.jpg"
  ),
  new Item(
    "Ice Cream Truck",
    "realEstate",
    500,
    120,
    100000,
    0,
    "https://cdn.pixabay.com/photo/2020/06/29/17/10/ice-cream-5353446_960_720.jpg"
  ),
  new Item(
    "House",
    "realEstate",
    100,
    32000,
    20000000,
    0,
    "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_960_720.jpg"
  ),
  new Item(
    "Town House",
    "realEstate",
    100,
    64000,
    40000000,
    0,
    "https://cdn.pixabay.com/photo/2018/01/31/12/16/architecture-3121009_960_720.jpg"
  ),
  new Item(
    "Mansion",
    "realEstate",
    20,
    500000,
    250000000,
    0,
    "https://cdn.pixabay.com/photo/2017/08/06/06/53/urban-2589645_960_720.jpg"
  ),
  new Item(
    "Industrial Space",
    "realEstate",
    10,
    2200000,
    1000000000,
    0,
    "https://cdn.pixabay.com/photo/2015/09/19/16/04/factory-947425_960_720.jpg"
  ),
  new Item(
    "Hotel Skyscraper",
    "realEstate",
    5,
    25000000,
    10000000000,
    0,
    "https://cdn.pixabay.com/photo/2016/12/23/18/28/singapore-1927720_960_720.jpg"
  ),
  new Item(
    "Bullet-Speed Sky Railway",
    "realEstate",
    1,
    30000000000,
    10000000000000,
    0,
    "https://cdn.pixabay.com/photo/2020/05/30/01/03/shinkansen-5237269_960_720.jpg"
  ),
];

class View {
  static createMainPage(user) {
    let container = document.createElement("div");
    container.classList.add("d-flex", "justify-content-between", "h-100");

    container.append(View.createLeftCon(user), View.createRightCon(user));

    return container;
  }

  static createLeftCon(user) {
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

    leftCon.innerHTML = `
      <div class="bg-gray col-3 mw-100 mb-3 d-flex flex-column align-items-center py-2">
        <div class="col-4 mw-100 d-flex align-items-center justify-content-center">
          <h4>${user.getBurgers()} Burgers</h4>
        </div>
        <div class="col-4 mw-100 d-flex align-items-center justify-content-center">
          <p>¥${user.getProfitPerClick()} / click</p>
        </div>
        <div class="col-4 mw-100 d-flex align-items-center justify-content-center">
          <p>¥${user.getProfitPerDay()} / day</p>
        </div>
      </div>
      <div class="col-9 d-flex justify-content-center align-items-center mw-100">
        <img class="burger pic hover" src="https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_960_720.png" alt="burger">
      </div>
    `;

    let burgerIcon = leftCon.querySelectorAll(".burger").item(0);
    burgerIcon.addEventListener("click", function () {
      Controler.burgerClick(user);
    });

    return leftCon;
  }

  static createRightCon(user) {
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

    rightCon.innerHTML += `
          <div class="user-info bg-navy col-3 p-2 mb-3 d-flex flex-column align-items-center mw-100">
          </div>
          <div id="item-table" class="bg-navy col-7 mw-100 overflow-auto p-0">
          </div>
          <div class="btn-con col-2 mw-100 d-flex justify-content-end align-items-center pr-1">
          </div>
    `;

    rightCon
      .querySelectorAll(".user-info")
      .item(0)
      .append(View.createUserInfoCon(user));
    rightCon
      .querySelectorAll("#item-table")
      .item(0)
      .append(View.createItemTableCon(user));
    rightCon.querySelectorAll(".btn-con").item(0).append(View.createButtonsCon(user));

    return rightCon;
  }

  static createUserInfoCon(user) {
    let userInfoCon = document.createElement("div");
    userInfoCon.classList.add(
      "col-12",
      "mw-100",
      "d-flex",
      "flex-column",
      "align-items-center",
      "p-0"
    );

    userInfoCon.innerHTML = `
      <div class="col d-flex justify-content-between mw-100 px-0 mb-2">
        <div class="col bg-gray text-center d-flex flex-column justify-content-center mr-2">
          <p>${user.getName()}</p>
        </div>
        <div class="col bg-gray text-center d-flex flex-column justify-content-center">
          <p>${user.getAge()} yrs old</p>
        </div>
      </div>
      <div class="col d-flex justify-content-between mw-100 px-0">
        <div class="col bg-gray text-center d-flex flex-column justify-content-center mr-2">
          <p>${user.getDays().toLocaleString()} days</p>
        </div>
        <div class="col bg-gray text-center d-flex flex-column justify-content-center">
          <p>¥${user.getMoney().toLocaleString()}</p>
        </div>
      </div>
    `;

    return userInfoCon;
  }

  static createItemTableCon(user) {
    let itemTableCon = document.createElement("div");
    itemTableCon.classList.add(
      "item-table",
      "bg-navy",
      "col-7",
      "mw-100",
      "h-100",
      "px-2",
      "pt-2"
    );

    let itemMenuCon = View.createItemMenu();

    //purchase windowを開くためのevent listenerを付与
    for (let i = 0; i < itemList.length; i++) {
      let item = itemList[i];
      let eachItemBox = itemMenuCon.querySelectorAll(".item-box")[i];
      eachItemBox.addEventListener("click", function () {
        itemMenuCon.classList.add("d-none");
        let purchaseWindowCon = View.createPurchaseWindow(user, item);
        itemTableCon.append(purchaseWindowCon);
      });
    }

    itemTableCon.append(itemMenuCon);

    return itemTableCon;
  }

  static createPurchaseWindow(user, item) {
    let container = document.createElement("div");
    container.classList.add("h-100", "pb-2");

    let name = item.getName();
    let maxPurchases = item.getMaxNum() - item.getPurchasedNum();
    let price = item.getPrice().toLocaleString();
    let image = item.getImage();
    let type = item.getType();
    let description = "Get ";
    if (type === "ability") {
      description += item.getDescription() + " extra yen per click";
    } else if (type === "investment") {
      description +=
        Math.floor((item.getDescription() / 100) * item.getPrice()).toLocaleString() +
        " extra yen per second";
    } else {
      description += item.getDescription().toLocaleString() + " extra yen per second";
    }

    container.innerHTML = `
      <div class="item-window bg-gray d-flex flex-column align-items-center justify-content-around h-100">
        <div class="col-6 d-flex align-items-center mw-100 px-0">
          <div class="col-7 d-flex flex-column align-items-start text-left">
            <h3>${name}</h3>
            <p>Max Purchases: ${maxPurchases}</p>
            <p>Price: ¥${price}</p>
            <p>${description}</p>
          </div>
          <div class="col-5">
            <img class="pic-item" src=${image} alt="${name}">
          </div>
        </div>
        <div class="col-6 mw-100">
          <div class="form-group text-left mb-1">
            <label for="numOfPurchase">How many would you like to purchase?</label>
            <input type="number" class="form-control text-right" id="numOfPurchase" value="0" min="0" max="${maxPurchases}">
          </div>
          <p class="text-right">Total: ¥30,000,000</p>
          <div class="d-flex justify-content-between py-2">
            <button type="submit" class="back-btn col btn btn-outline-primary btn-bg-white mr-2">Go Back</button>
            <button type="submit" class="purchase-btn col btn btn-primary">Purchase</button>
          </div>
        </div>
      </div>
    `;

    let backBtn = container.querySelectorAll(".back-btn").item(0);
    backBtn.addEventListener("click", function () {
      Controler.updateMainPage(user);
    });

    let purchaseBtn = container.querySelectorAll(".purchase-btn").item(0);
    purchaseBtn.addEventListener("click", function () {
      let inputNum = parseInt(
        container.querySelectorAll("#numOfPurchase").item(0).value
      );
      if (user.getMoney() < item.getPrice() * inputNum) {
        alert("You do not have enough money to buy!");
        return;
      }

      user.purchaseItem(item, inputNum);

      Controler.updateMainPage(user);
    });

    return container;
  }

  static createButtonsCon(user) {
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
      <div class="btn-reset col border border-white py-2 mr-3 hover hover-outline">
        <i class="fas fa-redo-alt fa-2x"></i>
      </div>
      <div class="btn-save col border border-white py-2 hover hover-outline">
        <i class="fas fa-save fa-2x"></i>
      </div>
    `;

    let resetBtn = buttonsCon.querySelectorAll(".btn-reset").item(0);
    let saveBtn = buttonsCon.querySelectorAll(".btn-save").item(0);

    resetBtn.addEventListener("click", function(){Controler.resetAllData(user)});

    return buttonsCon;
  }

  static createItemMenu() {
    let container = document.createElement("div");
    container.classList.add("item-list");
    let boxContainer = document.createElement("div");
    boxContainer.classList.add("d-flex", "flex-column", "align-items-center");

    for (let i = 0; i < itemList.length; i++) {
      let eachItemBox = View.createItemBox(itemList[i]);
      boxContainer.append(eachItemBox);
    }

    container.append(boxContainer);

    return container;
  }

  static createItemBox(item) {
    let container = document.createElement("div");
    container.classList.add(
      "item-box",
      "col",
      "bg-gray",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "mb-2",
      "hover-outline",
      "pl-2"
    );

    let image = item.getImage();
    let name = item.getName();
    let price = item.getPrice().toLocaleString();
    let type = item.getType();
    let description = "+ ";
    if (type === "ability") {
      description += "¥" + item.getDescription().toLocaleString() + " / click";
    } else if (type === "investment") {
      description += item.getDescription() + " % / day";
    } else {
      description += "¥" + item.getDescription().toLocaleString() + " / day";
    }

    container.innerHTML += `
      <div class="col-3 px-0 py-2">
        <img class="pic-item" src=${image} alt=${name}>
      </div>
      <div class="col-8 d-flex flex-column align-items-between justify-content-around text-left py-2">
        <h3>${name}</h3>
        <div class="d-flex flex-column align-items-between">
          <p class="col-12 pl-0">¥${price}</p>
          <p class="col-12 text-green pl-0">${description}</p>
        </div>
      </div>
      <div class="col-1 d-flex justify-content-center">
        <h3>${item.getPurchasedNum()}</h3>
      </div>
    `;
    return container;
  }
}

class Controler{
  static initializeUserAccount(user) {
    let name = user.getName();
    user = new User(name);
    config.mainPage.innerHTML = "";
    config.mainPage.append(View.createMainPage(user));
    setInterval(function(){Controler.updateUser(user)}, 1000);
  }

  static startGame() {
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
    config.mainPage.append(View.createMainPage(userAccount));

    setInterval(function(){Controler.updateUser(userAccount)}, 1000);
  }

  static updateUser(user){
    user.setDays();
    user.makeMoney(user.getProfitPerDay());
    let days = user.getDays();
    if (days % 365 === 0) user.setAge();
    Controler.updateUserInfoCon(user);
  }

  static updateMainPage(user) {
    config.mainPage.innerHTML = "";
    config.mainPage.append(View.createMainPage(user));
  }

  static updateUserInfoCon(user) {
    let userInfoCon = config.mainPage.querySelectorAll(".user-info").item(0);
    userInfoCon.innerHTML = "";
    userInfoCon.append(View.createUserInfoCon(user));
  }

  static burgerClick(user) {
    user.makeBurger();
    user.makeMoney(user.getProfitPerClick());
    Controler.updateMainPage(user);
  }

  static resetAllData(user){
    let result = confirm("Do you really want to Reset All Data?");
    if(result){
      Controler.initializeUserAccount(user);
    }
  }

  static timer(user){
    setInterval(function(){Controler.updateUser(user)}, 1000);
  }

  static stopTimer(){
    clearInterval(timer);
  }
}
