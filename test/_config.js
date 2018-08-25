const config  = [{
  "level": 0,
  "filterNode": "product",
  "keepAttributes": ["id"]
},{
  "level": 1,
  "filterNode": "variant",
  "attributeFilters": [{"color": "blue"}],
  "keepAttributes": ["name"]
},{
  "level": 1,
  "filterNode": "bullets",
  "keepAttributes": ["name"],
  "separator": ";"
},{
  "level": 2,
  "filterNode": "bullet",
  "flatten": true
},{
  "level": 3,
  "filterNode": "text",
  "flatten": true
},{
  "level": 2,
  "filterNode": "price",
  "flatten": true
}];

module.exports = config;