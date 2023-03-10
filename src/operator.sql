CREATE TABLE `taxi_summary` (
  `day` varchar(255) default NULL,
  `company` varchar(255) default NULL,
  `type` varchar(255) default NULL,
  `revenue` mediumint default NULL,
  `population` mediumint default NULL,
);

-- INSERT INTO `Customers` (`CustomerID`,`First_Name`,`Last_Name`,`Email`,`Age`,`Country`) VALUES 
-- (1,"Dorothy","Holman","id.libero.Donec@idnuncinterdum.edu",43,"Taiwan"),
-- (2,"Indigo","Hopper","sed.est.Nunc@Utnecurna.edu",57,"Taiwan"),


-- Union Composition

-- chart 1
-- as table_1

select 
    day,
    company,
    sum(population)
from taxi_summary
Group by day,company

-- chart 2 
-- as table_2
select 
    day,
    company,
    sum(population)
from taxi_summary
where company = 'A'
Group by day,company

-- chart  
-- as table_3
select 
    type,
    company,
    sum(population)
from taxi_summary    
where company = 'B'
group by type,ompany

-- chart 4
-- as table_4
select 
    type,
    company,
    sum(revenue)
from taxi_summary    
where company = 'B'
group by type,ompany


-- all the composition should recieve rows without collection? all the composition should recieve rows containing other dimension and metric?

-- explode composition 
-- var_name => the unique values in dimension company
-- multiple query based on number unique values in dimension 
SET @var_name = value;  
select 
    day,
    company,
    population
from table_1
where 
    company = @var_name
Group by day,company

-- extract composition --> only allows one statement in where clause? only allows in filter dimension?
select 
    day,
    company,
    sum(population)
from table_1
where 
    company = @var_name
Group by day,company

-- statistical composition
-- compute the result from original table for table 2 and 3
select 
day
,sum(if(company='A',revenue,0)) - sum(if(company='B',revenue,0)) as subtraction
from taxi_summary
Group by
day

-- in js object
Q = {dimension:"day",legend:"company",metric:"population",""}

-- union composition 
select 
    day,
    company,
    sum(population)
from taxi_summary
where company = 'A'
Group by day,company

union all

select 
    day,
    company,
    sum(population)
from taxi_summary
where company = 'B'
Group by day,company



-- how underlying query for selected operand, need to consider multiple click

-- take line chart as example
select 
    day,
    company,
    sum(population)
from taxi_summary
Group by day,company

-- 1. select entire chart --> same as query for creating the chart
select 
    day,
    company,
    sum(population)
from taxi_summary
Group by day,company


-- 2. select one mark on company='Comfort' and day ='11-03'
select 
    day,
    company,
    sum(population)
from taxi_summary
where 
    day = "11-03" 
    and company = 'Comfort'
Group by day,company


-- 3. select one constant value -
select 
    sum(population)
from taxi_summary
where 
    day = "11-03" 
    and company = 'Comfort'


-- 4. select one legend lable company='Comfort'
select 
    day,
    company,
    sum(population)
from taxi_summary
where 
    and company = 'Comfort'
Group by day,company





