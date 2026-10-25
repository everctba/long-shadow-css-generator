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

console.log("--------------");

const users: User[] = [
   { id: 'u1', name: 'Ana Souza' },
   { id: 'u2', name: 'Carlos Lima' },
   { id: 'u3', name: 'Bruna Oliveira' },
   { id: 'u4', name: 'Daniel Santos' },
   { id: 'u5', name: 'Eduarda Ribeiro' },
   { id: 'u6', name: 'Felipe Alves' },
]

for (let i in User) {

   console.log(i, User[i]);
}