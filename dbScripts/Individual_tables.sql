CREATE TABLE Locations(
LocationId INT IDENTITY(1,1) PRIMARY KEY,
Location nvarchar(50),
Active INT Default 1
)

CREATE TABLE Department(
DepartmentId INT IDENTITY(1,1) PRIMARY KEY,
Department nvarchar(50),
Active INT Default 1
)

CREATE TABLE Category(
CategoryId INT IDENTITY(1,1) PRIMARY KEY,
Category nvarchar(50),
Active INT Default 1
)

CREATE TABLE SubCategory(
SubCategoryId INT IDENTITY(1,1) PRIMARY KEY,
SubCategory nvarchar(100),
Active INT Default 1
)

