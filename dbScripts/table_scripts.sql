CREATE TABLE Location_dep_category(
Id INT IDENTITY(1,1) Primary key,
Location nvarchar(50),
Department nvarchar(50),
Category nvarchar(50),
SubCategory  nvarchar(100)
);

CREATE TABLE SKU_Data(
SKU INT Primary key,
Name nvarchar(50),
Location nvarchar(50),
Department nvarchar(50),
Category nvarchar(50),
SubCategory nvarchar(100)
);


CREATE TABLE Locations_x_ref
(
LocationId INT FOREIGN KEY REFERENCES Locations(LocationId),
DepartmentId INT FOREIGN KEY REFERENCES Department(DepartmentId),
CategoryId INT FOREIGN KEY REFERENCES Category(CategoryId),
SubCategoryId INT FOREIGN KEY REFERENCES SubCategory(SubCategoryId)
)

CREATE TABLE SKU_v2(
SKUId INT Primary key,
Name nvarchar(50),
LocationId INT FOREIGN KEY REFERENCES Locations(LocationId),
DepartmentId INT FOREIGN KEY REFERENCES Department(DepartmentId),
CategoryId INT FOREIGN KEY REFERENCES Category(CategoryId),
SubCategoryId INT FOREIGN KEY REFERENCES SubCategory(SubCategoryId)
);