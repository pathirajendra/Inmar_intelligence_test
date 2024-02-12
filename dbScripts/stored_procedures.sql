CREATE PROCEDURE GetAllSKUData(@location nvarchar(50), @department nvarchar(50), @category nvarchar(50), @subCategory nvarchar(50))
AS
BEGIN
	SELECT * FROM SKU_Data where Location = @location and Department = @department and Category = @category and SubCategory = @subCategory;

END



CREATE PROCEDURE GetAllLocations
AS
BEGIN
	SELECT * FROM Location_dep_category;
END


CREATE PROCEDURE GetDataByLocationId (@location nvarchar(50))
AS
BEGIN
	SELECT * FROM Location_dep_category where Location = @location;
END


CREATE PROCEDURE GetDataByDepartment (@location nvarchar(50), @department nvarchar(50))
AS
BEGIN
	SELECT * FROM Location_dep_category where Location = @location and Department = @department;
END

CREATE PROCEDURE GetDataByCategory (@location nvarchar(50), @department nvarchar(50), @category nvarchar(50))
AS
BEGIN
	SELECT * FROM Location_dep_category where Location = @location and Department = @department and Category = @category;
END


CREATE PROCEDURE GetDataBySubCategory (@location nvarchar(50), @department nvarchar(50), @category nvarchar(50), @subCategory nvarchar(50))
AS
BEGIN
	SELECT * FROM Location_dep_category where Location = @location and Department = @department and Category = @category and SubCategory = @subCategory;
END




ALTER PROCEDURE GetAllSKUData(@location nvarchar(50), @department nvarchar(50), @category nvarchar(50), @subCategory nvarchar(50))
AS
BEGIN
	SELECT * FROM SKU_Data where Location = @location and Department = @department and Category = @category and SubCategory = @subCategory;

END



CREATE PROCEDURE [dbo].[GetSKUData_v2](@location nvarchar(50), @department nvarchar(50), @category nvarchar(50), @subCategory nvarchar(50))
AS
BEGIN
	SELECT sku.SKUId, Name, Location, Department, Category, SubCategory FROM SKU_v2 sku
	JOIN Locations loc
	on loc.LocationId = sku.LocationId
	join Department dep
	on dep.DepartmentId = sku.DepartmentId
	join Category cat
	on cat.CategoryId = sku.CategoryId
	join SubCategory subCat
	on subCat.SubCategoryId = sku.SubCategoryId
	where loc.Location = @location and dep.Department = @department and cat.Category = @category and subCat.SubCategory = @subCategory
	order by Name;

END




CREATE PROCEDURE GetDataByAllParams_v2(@location nvarchar(50), @department nvarchar(50), @category nvarchar(50), @subCategory nvarchar(50))
AS
BEGIN
	SELECT loc.Location, Department, Category, SubCategory FROM Locations_x_ref ref
	JOIN Locations loc
	on loc.LocationId = ref.LocationId
	join Department dep
	on dep.DepartmentId = ref.DepartmentId
	join Category cat
	on cat.CategoryId = ref.CategoryId
	join SubCategory subCat
	on subCat.SubCategoryId = ref.SubCategoryId
	where loc.Location = @location and dep.Department = @department and cat.Category = @category and subCat.SubCategory = @subCategory
	order by Location;

END