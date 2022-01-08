// --------------- VALID MAPS ------------- //
const map1 = `
@---A---+
        |
x-B-+   C
    |   |
    +---+`;

const map2 = `
@         
| +-C--+  
A |    |  
+---B--+  
  |      x
  |      |
  +---D--+`;

const map3 = `
@---A---+
        |
x-B-+   |
    |   |
    +---C`;

const map4 = `
    +-O-N-+
    |     |
    |   +-I-+
@-G-O-+ | | |
    | | +-+ E
    +-+     S
            |
            x`;

const map5 = `
 +-L-+
 |  +A-+
@B+ ++ H
 ++    x`;


// ------------- INVALID MAPS --------- //

// o: Error
const map6 = `
   -A---+
        |
x-B-+   C
    |   |
    +---+`;

// o: Error
const map7 = `
@--A---+
       |
 B-+   C
   |   |
   +---+`;

// o: Error
const map8 = `
 @--A-@-+
        |
x-B-+   C
    |   |
    +---+`;

// o: Error
const map9 = `
 @--A---+
        |
x-Bx+   C
    |   |
    +---+`;

// o: Error
const map10 = `
     x-B
       |
@--A---+
       |
  x+   C
   |   |
   +---+`;

// o: Error
const map11 = `
@--A-+  
     |  
        
     B-x`;

// o: Error
const map12 = `-B-@-A-x`;

// o: Error
const map13 = `@-A-+-B-x`;

const map14 = `
@--A
   |
   x`;

export {
    map1,
    map2,
    map3,
    map4,
    map5,
    map6,
    map7,
    map8,
    map9,
    map10,
    map11,
    map12,
    map13,
    map14
};