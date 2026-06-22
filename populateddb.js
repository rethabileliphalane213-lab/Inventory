
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS pc_games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 game_name VARCHAR(100),
  
      genre VARCHAR(15),
      game_mode VARCHAR(15),
      game_type VARCHAR(15),
      release_date INT,
      publisher VARCHAR(255),
      price DECIMAL(10,2),
      stock_qty INT DEFAULT 9999,
      platform VARCHAR(255),
      rating DECIMAL(3,1),
      downloads INT DEFAULT 999
);

INSERT INTO pc_games ( game_name,
  genre,
  game_mode,
  game_type,
  publisher,
  price,
  platform) 
VALUES
  ('GRAND THEFT AUTO 3','ACTION','offline','singleplayer','Rockstar Games','200','steam'),
  ('GRAND THEFT AUTO Liberty City Stories','ACTION','offline','singleplayer','Rockstar Games','150','steam'),
  ('GRAND THEFT AUTO Vice City','ACTION','offline','singleplayer','Rockstar Games','230','steam'),
  ('GRAND THEFT AUTO Vice City Stories','ACTION','offline','singleplayer','Rockstar Games','100','steam'),
  ('GRAND THEFT AUTO San Andreas','ACTION','offline','singleplayer','Rockstar Games','300','steam'),
  ('GRAND THEFT AUTO IV','ACTION','offline','singleplayer','Rockstar Games','450','steam'),
  ('GRAND THEFT AUTO V','ACTION','offline','singleplayer','Rockstar Games','500','steam'),
  ('GRAND THEFT AUTO Vi','ACTION','offline','singleplayer','Rockstar Games','1500','steam'),

  ('PES14','sports','offline','MULTIPLAYER','KONAMI','0','Ankergames.com'),
  ('PES15','sports','offline','MULTIPLAYER','KONAMI','0','Ankergames.com'),
  ('PES16','sports','offline','MULTIPLAYER','KONAMI','0','Ankergames.com'),
  ('PES17','sports','offline','MULTIPLAYER','KONAMI','0','Ankergames.com'),
  ('PES18','sports','offline','MULTIPLAYER','KONAMI','0','Ankergames.com'),
  ('PES19','sports','offline','MULTIPLAYER','KONAMI','0','Ankergames.com'),
  ('PES20','sports','offline','MULTIPLAYER','KONAMI','0','Ankergames.com'),
  ('PES21','sports','offline','MULTIPLAYER','KONAMI','0','Ankergames.com'),
  ('PES22','sports','offline','MULTIPLAYER','KONAMI','0','Ankergames.com'),
  ('PES23','sports','offline','MULTIPLAYER','KONAMI','0','Ankergames.com'),
  ('PES24','sports','offline','MULTIPLAYER','KONAMI','0','Ankergames.com'),
  ('PES26','sports','offline','MULTIPLAYER','KONAMI','0','Ankergames.com'),
  ('PES126','sports','offline','MULTIPLAYER','KONAMI','0','Ankergames.com'),
  ('Call Of Duty ','Action','offline','Single','Activision','0','Ankergames.com'),
  ('Call Of Duty 2','Action','offline','MULTIPLAYER','Activision','0','Ankergames.com'),
  ('Call Of Duty 3','Action','offline','MULTIPLAYER','Activision','0','Ankergames.com'),
  ('Call Of Duty Modern Warfare','Action','offline','MULTIPLAYER','Activision','0','Ankergames.com'),
  ('Call Of Duty World At War','Action','offline','MULTIPLAYER','Activision','0','Ankergames.com'),
  ('Call Of Duty Modern Warfare 2','Action','offline','MULTIPLAYER','Activision','0','Ankergames.com'),
  ('Call Of Duty Black Ops','Action','offline','MULTIPLAYER','Activision','0','Ankergames.com'),
  ('Call Of Duty Modern Warfare 3 ','Action','offline','MULTIPLAYER','Activision','0','Ankergames.com'),
  ('Call Of Duty Black Ops 2','Action','offline','MULTIPLAYER','Activision','0','Ankergames.com'),
  ('Call Of Duty Ghost','Action','offline','MULTIPLAYER','Activision','0','Ankergames.com'),
  ('Call Of Duty Advanced Warfare','Action','offline','MULTIPLAYER','Activision','0','Ankergames.com'),
  ('Call Of Duty Black Ops 3','Action','offline','MULTIPLAYER','Activision','0','Ankergames.com'),
  ('Call Of Duty WWII','Action','offline','Single','Activision','0','Ankergames.com'),
  ('Call Of Duty Black Ops 4','Action','offline','Single','Activision','0','Ankergames.com'),
  ('Call Of Duty Black Ops Cold War','Action','offline','Single','Activision','0','Ankergames.com'),
  ('Call Of Duty Modern WarFare 3','Action','offline','Single','Activision','0','Ankergames.com'),
  ('Call Of Duty  Black Ops 6','Action','offline','Single','Activision','0','Ankergames.com'),
  ('Call Of Duty Black Ops 7','Action','offline','Single','Activision','0','Ankergames.com'),
  ('Call Of Duty War Zone','Action','offline','Single','Activision','0','Ankergames.com'),

  ('FIFA14','sports','offline','MULTIPLAYER','EA SPORTS','1000','Ankergames.com'),
  ('FIFA15','sports','offline','MULTIPLAYER','EA SPORTS','1000','Ankergames.com'),
  ('FIFA16','sports','offline','MULTIPLAYER','EA SPORTS','1000','Ankergames.com'),
  ('FIFA17','sports','offline','MULTIPLAYER','EA SPORTS','1000','Ankergames.com'),
  ('FIFA18','sports','offline','MULTIPLAYER','EA SPORTS','1000','Ankergames.com'),
  ('FIFA19','sports','offline','MULTIPLAYER','EA SPORTS','1000','Ankergames.com'),
  ('FIFA20','sports','offline','MULTIPLAYER','EA SPORTS','1000','Ankergames.com'),
  ('FIFA21','sports','offline','MULTIPLAYER','EA SPORTS','1000','Ankergames.com'),
  ('FIFA22','sports','offline','MULTIPLAYER','EA SPORTS','1000','Ankergames.com'),
  ('FIFA23','sports','offline','MULTIPLAYER','EA SPORTS','1000','Ankergames.com'),
  ('FIFA25','sports','offline','MULTIPLAYER','EA SPORTS','1000','Ankergames.com'),
  ('FIFA26','sports','offline','MULTIPLAYER','EA SPORTS','1000','Ankergames.com');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://postgres:rethabilenongs@localhost:5432/inventory",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();







