function welcome(name: string) {
   // return `welcome ${name}`;

   console.log(name);
   console.log('welcome');

   const user = {
      name: 'Rakesh',
   };

   const fname = user.name;
   return name + fname;
}

welcome('John Doe');
