Create table Client (
clId int auto_increment,
clFname varchar(40),
clLname varchar(40),
clEmail varchar(355) unique not null,
clSex char(2),
clStreet varchar(100),
clCity varchar(40),
clState char(2),
clZip char(5),
clPhone char(10),
clDOB date,
username varchar(50) unique not null,
password varchar(120) not null,
Primary key (clId));
Create table Client_Langs(
clId int,
clLang char(2),
Primary key (clId,clLang),
Foreign key (clId) references Client(clId));

Create table Drug(
drugId int auto_increment,
drugName varchar(120),
drugType varchar(40),
Primary key (drugId));
Create table Client_Drug_Allergies(
clId int,
drugId int,
Primary key (clId, drugId),
Foreign key (clId) references Client(clId),
Foreign key (drugId) references Drug(drugId));

Create table Facility(
fcId int auto_increment,
fcName varchar(100) not null,
fcType char(3) not null,
fcStreet varchar(100),
fcCity varchar(40),
fcState char(2),
fcZip char(5),
fcHours varchar(30),
Primary key (fcId));

Create table Doctor(
docId int auto_increment,
docFname varchar(40),
docLname varchar(40),
docLicense varchar(10),
docRating decimal(2,1),
docEmail varchar(355) unique not null,
username varchar(50) unique not null,
password varchar(120) not null,
Primary key (docId));

Create table Doc_Facility(
docId int,
fcId int,
docPhone char(10),
docHours varchar(30),
Primary key (docId, fcId),
Foreign key (docId) references Doctor(docId),
Foreign key (fcId) references Facility(fcId));

Create table Doc_Langs(
docId int,
docLang char(2),
Primary key (docId,docLang),
Foreign key (docId) references Doctor(docId));
Create table Doc_Specs(
docId int,
docSpec varchar(30),
Primary key (docId, docSpec),
Foreign key (docId) references Doctor(docId));

Create table InsuranceCompany(
insCompId int auto_increment,
insCompName varchar(75),
Primary key (insCompId)
);
Create table InsurancePlan(
insId int auto_increment,
insCompId int,
insPlan varchar(100),
Primary key (insId),
Foreign key (insCompId) references InsuranceCompany(insCompId));
Create table Doc_Insurance(
docId int,
insCompId int,
Primary key (docId, insCompId),
Foreign key (docId) references Doctor(docId),
Foreign key (insCompId) references InsuranceCompany(insCompId));
Create table Client_Insurance(
clId int,
insId int,
Primary key (clId, insId),
Foreign key (clId) references Client(clId),
Foreign key (insId) references InsurancePlan(insId));

Create table Conditions(
condId int auto_increment,
condName varchar(120) not null,
condType varchar(40),
Primary key (condId));
Create table Treatment(
trId int auto_increment,
trName varchar(120) not null,
trType varchar(40),
sucessRate decimal(4,3),
Primary key (trId));
Create table Condition_Treatment(
condId int,
trId int,
Primary key (condId, trId),
Foreign key (condId) references Conditions(condId),
Foreign key (trId) references Treatment(trId));
Create table TreatmentCost(
fcId int,
docId int,
trId int,
cost decimal(7,2),
Primary key (fcId,docId,trId),
Foreign key (docId) references Doctor(docId),
Foreign key (fcId) references Facility(fcId),
Foreign key (trId) references Treatment(trId)
);
Create table Treatment_Drugs(
trId int,
drugId int,
Primary key (trId,drugId),
Foreign key (trId) references Treatment(trId),
Foreign key (drugId) references Drug(drugId));

Create table Pharmacy(
phId int,
storeName varchar(75) not null,
phStreet varchar(100),
phCity varchar(40),
phState char(2),
phPhone char(10),
phHours varchar(30),
Primary key (phId)
);
Create table Prescription(
preId int auto_increment,
clId int,
docId int,
phId int,
preCost decimal(5,2),
Primary key (preId),
Foreign key (phId) references Pharmacy(phId),
Foreign key (clId) references Client(clId),
Foreign key (docId) references Doctor(docId));
Create table Prescription_Drugs(
preId int,
drugId int,
Primary key (preId,drugId),
Foreign key (preId) references Prescription(preId),
Foreign key (drugId) references Drug(drugId));
