import { GildedRose } from './gilded-rose';
import { Item } from './item';

const items: Array<Item> = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

const gildedRose = new GildedRose(items);

console.log('\n🛒 Inventory Quality Report');
console.log('===========================');
console.log('\n📦 Before update:\n');
console.table(gildedRose.items);

gildedRose.updateQuality();

console.log('\n📈 After update:\n');
console.table(gildedRose.items);
