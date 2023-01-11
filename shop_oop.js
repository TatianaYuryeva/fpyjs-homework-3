class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id
        this.name = name
        this.description = description
        this.sizes = sizes
        this.price = price
        this.available = available
    }
    setAvailable(available) {
        this.available = available
    }
}

class GoodsList {
    #goods
    constructor(goods, filter, sortPrice=true, sortDir=true) {
        this.#goods = goods
        this.filter = new RegExp(filter, 'i')
        this.sortPrice = sortPrice
        this.sortDir = sortDir
    }
    get list() {
        let filter = this.filter
        let filteredGoods = this.#goods.filter(good => filter.test(good.name))
        let sortedGoods;
        if (this.sortDir) {
            sortedGoods = filteredGoods.sort((a, b) => a.price - b.price)
        } else {
            sortedGoods = filteredGoods.sort((a, b) => b.price - a.price)
        }
        return sortedGoods
    }
    add(good) {
        this.#goods.push(good)
    }
    remove(id) {
        this.#goods.forEach(good => {
            if (good.id == id) {
                this.#goods.splice(this.#goods.indexOf(good), 1)
            }
        });
    }
}

class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available)
        this.amount = amount
    }
}

class Basket {
    constructor(goods) {
        this.goods = goods
    }
    get totalAmount() {
        let amount = 0
        return this.goods.reduce((acc, good) => 
            acc + good.amount, amount)  
    }
    get totalSum() {
        let sum = 0
        return this.goods.reduce((acc, good) => 
            acc + good.price * good.amount, sum)
    }
    add(good, amount) {
        for(let i = 0; i < this.goods.length; i++) {
            if (this.goods[i].id == good.id) {
                this.goods[i].amount += amount
                return
            }
        }
        this.goods.push(new BasketGood(good, amount))   
    }
    remove(good, amount) {
        for(let i = 0; i < this.goods.length; i++) {
            if (this.goods[i].id == good.id) {
                this.goods[i].amount -= amount
            } 
            if (this.goods[i].amount <= 0) {
                this.goods.splice(this.goods.indexOf(this.goods[i]), 1)
            }
        }
    }
    clear() {
        this.goods.splice(0)    
    }
    removeUnavailable() {
        for(let i = 0; i < this.goods.length; i++) {
            if (this.goods[i].available == false) {
                this.goods.splice(this.goods.indexOf(this.goods[i]), 1)
            }
        }
    }
}

let good1 = new Good (1, 'Футболка', 'Описание', [], 1500, true)
let good2 = new Good (2, 'Джинсы', 'Описание', [], 3500, true)
let good3 = new Good (3, 'Куртка', 'Описание', [], 5500, true)
let good4 = new Good (4, 'Футболка', 'Описание', [], 1000, true)
let good5 = new Good (5, 'Пальто', 'Описание', [], 10000, true)
let goodsList = new GoodsList([good2, good3, good4, good1], "", true, false)
goodsList.add(good5)
good5.setAvailable(false)
goodsList.remove(2)
console.log(goodsList.list)
console.log("----------------------------------------")

let basketGood1 = new BasketGood(good1, 2)
let basketGood2 = new BasketGood(good2, 2)
let basketGoods = [basketGood1, basketGood2]
let basket = new Basket(basketGoods)
basket.add(good5, 2)
basket.add(good2, 3)
console.log(basket.goods) 
console.log("----------------------------------------")
basket.removeUnavailable()
console.log(basket.goods)
console.log(basket.totalSum)
console.log(basket.totalAmount)
console.log("----------------------------------------")
basket.remove(good2, 6)
console.log(basket.goods)
console.log("----------------------------------------")
basket.clear()
console.log(basket.goods)
