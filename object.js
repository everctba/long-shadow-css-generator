console.log("--------------");

const book = {
   nome: "influenciar amigos",
   preco: 19.90,
   paginas: 200,
   disponibilidade: true

};

for (let key in book) {

   console.log(key, book[key]);
}

console.log("--------------");
// console.log(book);
