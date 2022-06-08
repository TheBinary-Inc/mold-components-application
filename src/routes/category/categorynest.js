const express = require("express");
const PRODUCT_SCHEMA = require("../../models/Product");

const CATEGORYNEST = express.Router();

CATEGORYNEST.get("/category-nest", async (req, res) => {
  // const mainCategoryData = await PRODUCT_SCHEMA.find({})
  const mainCategory_uz  = ["ЧПУ учун инструментлар", "Улчов асбоблари", "Абразив инструментлар", "Пресс-форма кисмлари", "Пресс-форма мойлари", "Ускуналар", "Бошкалар"]
  const mainCategory_ru  = ["Инструменты для ЧПУ", "Измерительные инструменты", "Абразивные инструменты", "Компоненты для пресс-форм", "Смазка для пресс-форм", "Станки", "Другое"]
  var productSubCategories_uz = [
    [
      "Фрезалар",
      "Сверлолар",
      "Оснасткалар",
      "Метчиклар",
      "Развёрткалар",
      "Центровочно сверлолар"
    ],
    [
      "Штангенциркуль",
 	 	 	"Микрометр",
 	 	 	"Индикатор"
    ],
    [
      "Полировка инструментлар",
      "Шлифовка инструментлар"
    ],
    [
      "Толкатель",
      "Пружина",
 	 	 	"Совутиш системаси",
 	 	 	"Летник",
 	 	 	"Кольцолар",
 	 	 	"Аксессуарлар",
    ],
    [""],
    [
      "Металга ишлов берувчи ЧПУ ускуна"  ,   
 	 	 	"Электроэрозия йули билан сим оркали кесувчи ускуна",
 	 	 	"Электроэрозия йули билан прошивка килувчи ускуна",
 	 	 	"Термопластавтоматлар",
 	 	 	"Пресс-формалар"
    ], 
    [""]
  ];
  var productSubCategories_ru = [
    ["Фрезы", "Сверла", "Инструментальная оснастка", "Метчики", "Развёртки", "Центровочное сверло"], ["Штангенциркули", "Микрометры", "Индикаторы"], 
    ["Полировочные инструменты", "Шлифовальные инструменты"], 
    ["Толкатели", "Пружины", "Система охлождение", "Летники", "Кольцо центрирующее", "Аксессуары"],
    [""],
    ["Металлообрабатывающие станки с ЧПУ","Электроэрозионный проволочно-вырезные станки", "Копировально-прошивные станки", "Термопластавтоматы", "Пресс-формы"],
    [""]
  ];

  // for(let i = 0; i < mainCategory_uz.length; i++){
  //   const mains_uz = await PRODUCT_SCHEMA.find({productMainCategory_uz: mainCategory_uz[i]});
  //   const mainsArr_uz = []
  //   const mainsArr_ru = []
  //   for(j = 0; j < mains_uz.length; j++){
  //     mainsArr_uz.push(mains_uz[j].productSubCategory_uz)
  //     mainsArr_ru.push(mains_uz[j].productSubCategory_ru)
  //   }
  //   productSubCategories_uz.push([...new Set(mainsArr_uz)])
  //   productSubCategories_ru.push([...new Set(mainsArr_ru)])
  // }  

  res.status(200).json({
    productSubCategories_uz,
    productSubCategories_ru,
    mainCategory_uz,
    mainCategory_ru
  })

})

module.exports = CATEGORYNEST