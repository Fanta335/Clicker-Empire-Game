const config = {
  initialForm: document.getElementById("initial-form"),
  mainPage: document.getElementById("main-page"),
};

class User {
  constructor(
    name,
    age,
    days,
    money,
    burgers,
    profitPerClick,
    profitPerDay,
    purchasedItems
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
}

class View {
  static initialToMain(user) {
    config.initialForm.classList.add("d-none");
    config.mainPage.classList.add(
      "bg-gray",
      "col-12",
      "text-center",
      "text-white",
      "h-75"
    );
    config.mainPage.append(View.createMainPage(user));

    Controler.startTimer(user);
  }

  static createMainPage(user) {
    let container = document.createElement("div");
    container.classList.add("d-flex", "justify-content-between", "h-100");
    container.append(View.createLeftCon(user), View.createRightCon(user));
    return container;
  }

  static createLeftCon(user) {
    let leftCon = document.createElement("div");
    leftCon.classList.add(
      "left-con",
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
          <h4>${user.burgers.toLocaleString()} Burgers</h4>
        </div>
        <div class="col-4 mw-100 d-flex align-items-center justify-content-center">
          <p>¥${user.profitPerClick.toLocaleString()} / click</p>
        </div>
        <div class="col-4 mw-100 d-flex align-items-center justify-content-center">
          <p>¥${user.profitPerDay.toLocaleString()} / day</p>
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
    rightCon
      .querySelectorAll(".btn-con")
      .item(0)
      .append(View.createButtonsCon(user));

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
          <p>${user.name}</p>
        </div>
        <div class="col bg-gray text-center d-flex flex-column justify-content-center">
          <p>${user.age} yrs old</p>
        </div>
      </div>
      <div class="col d-flex justify-content-between mw-100 px-0">
        <div class="col bg-gray text-center d-flex flex-column justify-content-center mr-2">
          <p>${user.days.toLocaleString()} days</p>
        </div>
        <div class="col bg-gray text-center d-flex flex-column justify-content-center">
          <p>¥${user.money.toLocaleString()}</p>
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

    let itemMenuCon = View.createItemMenu(user);
    let itemList = user.purchasedItems;

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

    let name = item.name;
    let maxPurchases =
      item.maxNum === Infinity ? "∞" : item.maxNum - item.purchasedNum;
    let image = item.image;
    let type = item.type;
    let description = "Get ";
    if (type === "ability") {
      description += item.description + " extra yen per click";
    } else if (type === "investment") {
      description +=
        Math.floor((item.description / 100) * item.price).toLocaleString() +
        " extra yen per second";
    } else {
      description +=
        item.description.toLocaleString() + " extra yen per second";
    }

    container.innerHTML = `
      <div class="item-window bg-gray d-flex flex-column align-items-center justify-content-around h-100">
        <div class="col-6 d-flex align-items-center mw-100 px-0">
          <div class="col-7 d-flex flex-column align-items-start text-left">
            <h3>${name}</h3>
            <p>Max Purchases: ${maxPurchases}</p>
            <p>Price: ¥${item.price.toLocaleString()}</p>
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
          <p class="total-price text-right">Total: ¥0</p>
          <div class="d-flex justify-content-between py-2">
            <button type="submit" class="back-btn col btn btn-outline-primary btn-bg-white mr-2">Go Back</button>
            <button type="submit" class="purchase-btn col btn btn-primary">Purchase</button>
          </div>
        </div>
      </div>
    `;

    let form = container.querySelectorAll("#numOfPurchase").item(0);
    let totalPriceP = container.querySelectorAll(".total-price").item(0);
    form.addEventListener("change", function () {
      let totalPrice = (form.value * item.price).toLocaleString();
      totalPriceP.innerHTML = `Total: ¥${totalPrice}`;
    });

    let backBtn = container.querySelectorAll(".back-btn").item(0);
    backBtn.addEventListener("click", function () {
      Controler.updateMainPage(user);
    });

    let purchaseBtn = container.querySelectorAll(".purchase-btn").item(0);
    purchaseBtn.addEventListener("click", function () {
      if (maxPurchases < parseInt(form.value)) {
        alert(`No more stock! Please put less number.`);
        return;
      } else if (user.money < item.price * parseInt(form.value)) {
        alert("You do not have enough money to buy!");
        return;
      }

      Controler.purchaseItem(user, item, parseInt(form.value));
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

    resetBtn.addEventListener("click", function () {
      Controler.resetAllData(user);
    });

    saveBtn.addEventListener("click", function () {
      Controler.saveUser(user);
    });

    return buttonsCon;
  }

  static createItemMenu(user) {
    let container = document.createElement("div");
    container.classList.add("item-list");
    let boxContainer = document.createElement("div");
    boxContainer.classList.add("d-flex", "flex-column", "align-items-center");

    let itemList = user.purchasedItems;
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

    let type = item.type;
    let description = "+ ";
    if (type === "ability") {
      description += "¥" + item.description.toLocaleString() + " / click";
    } else if (type === "investment") {
      description += item.description + " % / day";
    } else {
      description += "¥" + item.description.toLocaleString() + " / day";
    }

    container.innerHTML += `
      <div class="col-3 px-0 py-2">
        <img class="pic-item" src=${item.image} alt=${item.name}>
      </div>
      <div class="col-8 d-flex flex-column align-items-between justify-content-around text-left py-2">
        <h3>${item.name}</h3>
        <div class="d-flex flex-column align-items-between">
          <p class="col-12 pl-0">¥${item.price.toLocaleString()}</p>
          <p class="col-12 text-green pl-0">${description}</p>
        </div>
      </div>
      <div class="col-1 d-flex justify-content-center">
        <h3>${item.purchasedNum}</h3>
      </div>
    `;

    return container;
  }
}

class Controler {
  timer;

  static setupGame() {
    let newGameBtn = document.getElementById("newGame");
    let loginBtn = document.getElementById("login");
    newGameBtn.addEventListener("click", function () {
      Controler.startGame();
    });
    loginBtn.addEventListener("click", function () {
      Controler.continueGame();
    });
  }

  static startGame() {
    let name = document
      .getElementById("name-form")
      .querySelectorAll(`input[name="userName"]`)
      .item(0).value;
    if (name === "") return;
    let userAccount = Controler.initializeUserAccount(name);
    View.initialToMain(userAccount);
  }

  static initializeUserAccount(userName) {
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
    if (userName === "cheater")
      return new User(userName, 20, 0, Math.pow(10, 13), 0, 25, 0, itemList);
    return new User(userName, 20, 0, 50000, 0, 25, 0, itemList);
  }

  static continueGame() {
    let nameInput = document
      .getElementById("name-form")
      .querySelectorAll(`input[name="userName"]`)
      .item(0).value;
    if (nameInput === "") return;
    if (Controler.loadUser().name === nameInput) {
      let userLoaded = Controler.loadUser();
      View.initialToMain(userLoaded);
    } else {
      alert("This name has not been saved.");
    }
  }

  static updateUser(user) {
    user.days++;
    user.money += user.profitPerDay;
    let days = user.days;
    if (days % 365 === 0) user.age++;
    Controler.updateUserInfoCon(user);
  }

  static updatePrice(item, rate, num) {
    let diff = Math.floor(item.price * Math.pow(1 + rate, num)) - item.price;
    item.price += diff;
    return item.price;
  }

  static updatePurchasedNum(item, num) {
    if (item.purchasedNum === item.maxNum) {
      alert("Out of stock! Thank you!");
      return;
    } else if (item.purchasedNum + num > item.maxNum) {
      alert(`No more stock! Please put less number.`);
      return;
    }
    item.purchasedNum += num;
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
    user.burgers++;
    user.money += user.profitPerClick;
    Controler.updateMainPage(user);
  }

  static insertTotalPrice(price, num, ele) {
    let totalPrice = (num * price).toLocaleString();
    ele.innerHTML = `Total: ¥${totalPrice}`;
  }

  static purchaseItem(user, item, num) {
    if (num === 0) return;

    if (item.name === "EFT Stock") {
      let profit = Math.floor(item.price * Math.pow(1 + 0.1, num)) - item.price;
      Controler.updatePrice(item, 0.1, num);
      user.profitPerDay += Math.floor((profit * item.description) / 10);
      user.money -= item.price * num;
      Controler.updatePurchasedNum(item, num);
      return;
    }

    user.money -= item.price * num;
    Controler.updatePurchasedNum(item, num);

    let type = item.type;
    if (type === "ability") {
      user.profitPerClick += item.description * num;
    } else if (type === "investment") {
      user.profitPerDay += Math.floor(
        (item.description / 100) * item.price * num
      );
    } else {
      user.profitPerDay += item.description * num;
    }
  }

  static resetAllData(user) {
    let result = confirm("Do you really want to Reset All Data?");
    if (result) {
      Controler.stopTimer();
      let newUser = Controler.initializeUserAccount(user.name);
      Controler.updateMainPage(newUser);
      Controler.startTimer(newUser);
    }
  }

  static startTimer(user) {
    Controler.timer = setInterval(function () {
      Controler.updateUser(user);
    }, 1000);
  }

  static stopTimer() {
    clearInterval(Controler.timer);
  }

  static saveUser(user) {
    //user objectをjson文字列として保存
    localStorage.setItem("saveData", JSON.stringify(user));
    alert("Saved current status! You can log-in to restart in this status!");
  }

  static loadUser() {
    let data = localStorage.getItem("saveData");
    //json文字列を取得し、objectを生成
    return JSON.parse(data);
  }
}

Controler.setupGame();
