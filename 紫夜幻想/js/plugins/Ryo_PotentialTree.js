
//=============================================================================
// Ryo_PotentialTree
//=============================================================================

/*:
 * @plugindesc 天赋点系统。
 * @author RyoSonic
 *
 * @param Point X
 * @desc 角色的天赋点所在位置X。
 * @default 933
 *
 * @param Point Y
 * @desc 角色的天赋点所在位置Y。
 * @default 47
 *
 * @param Name X
 * @desc 角色的名字与职业所在位置X。
 * @default 150
 *
 * @param Name Y
 * @desc 角色的名字与职业所在位置Y。
 * @default 490
 *
 * @param Skill Type Layout X
 * @desc 角色的天赋分类Layout所在位置X。
 * @default 100
 *
 * @param Skill Type Layout Y
 * @desc 角色的天赋分类Layout所在位置Y。
 * @default 180 
 *
 * @param Skill Type Name X
 * @desc 角色的天赋分类名字图像所在位置X。
 * @default 100
 *
 * @param Skill Type Name Y
 * @desc 角色的天赋分类名字图像所在位置Y。
 * @default 180
 *
 * @param Skill Type 2 X
 * @desc 角色的天赋学习流程Layout所在位置X。
 * @default 200 
 *
 * @param Skill Type 2 Y
 * @desc 角色的天赋学习流程Layout所在位置Y。
 * @default 400
 *
 * @param Skill Icon X
 * @desc 技能图标X轴。
 * @default 150
 *
 * @param Skill Icon Y
 * @desc 技能图标Y轴。
 * @default 543
 *
 * @param Skill Name X
 * @desc 技能名字X轴。
 * @default 200
 *
 * @param Skill Name Y
 * @desc 技能名字Y轴。
 * @default 535
 *
 * @param Actor X
 * @desc 角色立体图X轴。
 * @default 600
 *
 * @param Actor Y
 * @desc 角色立体图Y轴。
 * @default 54
 * @help  
 * 将所有文件放到／img／blast中
 * 在没有人行动时按下tab强制发动技能。
 */

var Imported = Imported || {};
Imported.Ryo_PotentialTree = true;
var Ryo = Ryo || {};
Ryo.parameters = PluginManager.parameters('Ryo_PotentialTree');

Ryo.tree_pointX = Number(Ryo.parameters['Point X'])
Ryo.tree_pointY = Number(Ryo.parameters['Point Y'])
Ryo.tree_nameX = Number(Ryo.parameters['Name X'])
Ryo.tree_nameY = Number(Ryo.parameters['Name Y'])
Ryo.tree_list1X = Number(Ryo.parameters['Skill Type Layout X'])
Ryo.tree_list1Y = Number(Ryo.parameters['Skill Type Layout Y'])
Ryo.tree_listnameX = Number(Ryo.parameters['Skill Type Name X'])
Ryo.tree_listnameY = Number(Ryo.parameters['Skill Type Name Y'])
Ryo.tree_list2X = Number(Ryo.parameters['Skill Type 2 X'])
Ryo.tree_list2Y = Number(Ryo.parameters['Skill Type 2 Y'])
Ryo.tree_skillIconX = Number(Ryo.parameters['Skill Icon X'])
Ryo.tree_skillIconY = Number(Ryo.parameters['Skill Icon Y'])
Ryo.tree_skillNameX = Number(Ryo.parameters['Skill Name X'])
Ryo.tree_skillNameY = Number(Ryo.parameters['Skill Name Y'])
Ryo.tree_ActorBitX = Number(Ryo.parameters['Actor X'])
Ryo.tree_ActorBitY = Number(Ryo.parameters['Actor Y'])

//=============================================================================
// DataManager
//=============================================================================
var _ryo_tree_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!_ryo_tree_isDatabaseLoaded.call(this)) return false;
    this.processActor($dataActors);
    this.processSkill($dataSkills);
  return true;
};

DataManager.processActor = function(group) {
  var note1 = /<(?:ACTOR TREES|actor trees):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2 = /<(?:TREE MAX|tree max):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.actorTrees = [];
    obj.treeMax = []

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.actorTrees = obj.actorTrees.concat(array);
      } else if (line.match(note2)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.treeMax = obj.treeMax.concat(array);
      }
    }
  }
};


DataManager.processSkill = function(group) {
  var note1 = /<(?:LEARN MAX LEVEL):[ ](\d+)>/i;
  var note2 = /<(?:REQUIRE SKILL TREE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note3 = /<(?:REQUIRE TREE LEVEL):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note4 = /<(?:REQUIRE TREE POINT):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note5 = /<(?:TREE POSITION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.learnMaxLevel = 9;
    obj.requireTreeSkills = []
    obj.requireTreeLevel = []
    obj.requireTreePoints = []
    obj.TreePos = []

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.learnMaxLevel = parseInt(RegExp.$1);
      } else if (line.match(note2)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.requireTreeSkills = obj.requireTreeSkills.concat(array);
      } else if (line.match(note3)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.requireTreeLevel = obj.requireTreeLevel.concat(array);
      } else if (line.match(note4)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.requireTreePoints = obj.requireTreePoints.concat(array);
      } else if (line.match(note5)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.TreePos = obj.TreePos.concat(array);
      }
    }
  }
};

//=============================================================================
// ImageManager
//=============================================================================
ImageManager.loadTree = function(filename) {
    return this.loadBitmap('img/skilltree/', filename, 0, true);
};

//=============================================================================
// Game Actor
//=============================================================================
var _ryo_tree_Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    _ryo_tree_Game_Actor_setup.call(this, actorId);
    this.initSkillTrees();
};

Game_Actor.prototype.initSkillTrees = function() {
    this.actorTrees = this.actor().actorTrees;
    this.treeMax = this.actor().treeMax;
};

var _ryo_tree_Game_Actor_initSkills = Game_Actor.prototype.initSkills
Game_Actor.prototype.initSkills = function() {
    this._skillLevel = [];
    for (i = 0; i <= $dataSkills.length; i++) {
        this._skillLevel[i] = 0;
    }
    _ryo_tree_Game_Actor_initSkills.call(this);
};

var _ryo_tree_Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    _ryo_tree_Game_Actor_learnSkill.call(this,skillId);
    this._skillLevel[skillId] = 1;
};

var _ryo_tree_Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
Game_Actor.prototype.forgetSkill = function(skillId) {
    _ryo_tree_Game_Actor_forgetSkill.call(this,skillId);
    this._skillLevel[skillId] = 0;
};

//=============================================================================
// Window TreeHelp
//=============================================================================
function Window_TreeHelp() {
    this.initialize.apply(this, arguments);
}

Window_TreeHelp.prototype = Object.create(Window_Help.prototype);
Window_TreeHelp.prototype.constructor = Window_TreeHelp;

Window_TreeHelp.prototype.initialize = function(numLines) {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this._text = '';
    this.hide();
    this.createInfoLayout();
    this.opacity = 0;
    this._errorIndex = 0;
};

Window_TreeHelp.prototype.refresh = function() {
    this.contents.clear();
    this._errorIndex = 0;
    var w = 0;
    var item = SceneManager._scene._itemWindow.item()
    var actor = SceneManager._scene.user();
    var des = this._text.split('\n');
    for (var i = 0; i < des.length; i++) {
	var lineWidth = des[i].length * 20 + this.standardPadding() * 2;	
        if (w < lineWidth) w = lineWidth;
    }; 
    this.contents.width = w;
    this.width = w;
    this.height = item ? (des.length + 2) * 24 + this.standardPadding() * 3 : 0;
    this.drawBackground(0, 0, this.width, this.height);
    if (item) {
        var cost = item.requireTreePoints[actor._skillLevel[item.id] + 1] || 0
        if (actor._skillLevel[item.id] < item.learnMaxLevel) var text = '需要消耗天赋值：' + cost;
        else var text = '天赋已经达到了顶点。';
        if (actor._skillLevel[item.id] > item.learnMaxLevel - 1) this._errorIndex = 1;
        var cost = item.requireTreePoints[actor._skillLevel[item.id] + 1] || 0
        if (actor._skillLevel[0] < cost) this._errorIndex = 2;
        for (i = 0; i < item.requireTreeSkills.length; i++) {
            if (actor._skillLevel[item.requireTreeSkills[i]] < item.requireTreeLevel[i]) this._errorIndex = 3;
        }
    } else var text = '';
    this.drawText(text, 4, 0, this.width, 'left')
    if (this._errorIndex === 0) {
        var text = '可以学习：可以领悟该天赋。'
    } else if (this._errorIndex === 1) {
        var text = '不能学习：已经到达等级上限。'
    } else if (this._errorIndex === 2) {
        var text = '不能学习：天赋值不够。'
    } else if (this._errorIndex === 3) {
        var text = '不能学习：没有领悟必要的天赋条件。'
    }
    this.drawText(text, 4, 24, this.width, 'left')
    for (i = 0; i < des.length; i++) {
        this.drawText(des[i], 4, 24 * (i + 2), this.width, 'left')
    }
    if (item === undefined) return;
    this.x = item.TreePos[0] + 32;
    this.y = item.TreePos[1] + 32;
};

Window_TreeHelp.prototype.resetFontSettings = function() {
    this.contents.fontSize = 20;
    this.resetTextColor();
};

Window_TreeHelp.prototype.standardPadding = function() {
    return 6;
};

Window_TreeHelp.prototype.drawBackground = function(wx, wy, ww, wh) {
    var color1 = 'rgba(0, 0, 0, 0.6)'
    var color2 = 'rgba(0, 0, 0, 0)'
    var ww1 = Math.ceil(ww * 0.25)
    var ww2 = Math.ceil(ww * 0.75)
    this.contents.gradientFillRect(wx, wy, ww1, wh, color1, color1);
    this.contents.gradientFillRect(ww1, wy, ww2, wh, color1, color2);
};

Window_TreeHelp.prototype.createInfoLayout = function() {
    this._infoLayout = new Sprite(ImageManager.loadTree('Info'));
    this._infoLayout.x = -16;
    this._infoLayout.y = -12;
    this.addChild(this._infoLayout)
};

//=============================================================================
// Window TreeActor
//=============================================================================
function Window_TreeActor() {
    this.initialize.apply(this, arguments);
}

Window_TreeActor.prototype = Object.create(Window_Selectable.prototype);
Window_TreeActor.prototype.constructor = Window_TreeActor;

Window_TreeActor.prototype.initialize = function(x, y) {
    this._actors = [];
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.opacity = 0;
    this.contentsOpacity = 0;
    this.select(0);
};


Window_TreeActor.prototype.cursorUp = function() {
}

Window_TreeActor.prototype.cursorDown = function() {
}

Window_TreeActor.prototype.cursorRight = Window_TreeActor.prototype.cursorDown;
Window_TreeActor.prototype.cursorLeft = Window_TreeActor.prototype.cursorUp;

Window_TreeActor.prototype.cursorPagedown = function() {
    var index = this.index();
    var maxItems = this.maxItems();
    this.select((index + 1) % maxItems);
};

Window_TreeActor.prototype.cursorPageup = function() {
    var index = this.index();
    var maxItems = this.maxItems();
    this.select((index - 1 + maxItems) % maxItems);
};

Window_TreeActor.prototype.windowWidth = function() {
    return 256;
};

Window_TreeActor.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};

Window_TreeActor.prototype.numVisibleRows = function() {
    return 4;
};

Window_TreeActor.prototype.maxCols = function() {
    return 1;
};

Window_TreeActor.prototype.maxItems = function() {
    return this._actors.length;
};

Window_TreeActor.prototype.actor = function() {
    return this._actors[this.index()];
};

Window_TreeActor.prototype.actorIndex = function() {
    var actor = this.actor();
    return actor ? actor.index() : -1;
};

Window_TreeActor.prototype.drawItem = function(index) {
    this.resetTextColor();
    var name = this._actors[index].name();
    var rect = this.itemRectForText(index);
    this.drawText(name, rect.x, rect.y, rect.width);
    this.changePaintOpacity(true);
};

Window_TreeActor.prototype.show = function() {
    this.refresh();
    Window_Selectable.prototype.show.call(this);
};

Window_TreeActor.prototype.refresh = function() {
    this._actors = $gameParty.battleMembers();
    Window_Selectable.prototype.refresh.call(this);
};

Window_TreeActor.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    $gameParty.select(this.actor());
};

Window_TreeActor.prototype.isCurrentItemEnabled = function() {
    return true;
};

Window_TreeActor.prototype.set_mcursor_data = function() {
};

//=============================================================================
// Window_TreeList
//=============================================================================

function Window_TreeList() {
    this.initialize.apply(this, arguments);
}

Window_TreeList.prototype = Object.create(Window_SkillList.prototype);
Window_TreeList.prototype.constructor = Window_TreeList;

Window_TreeList.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_SkillList.prototype.initialize.call(this, x, y, width, height);
    this._treeRow = 0;
    this.hide();
    this.opacity = 0;
    this.contentsOpacity = 0;
}

Window_TreeList.prototype.windowWidth = function() {
    return 1080;
};

Window_TreeList.prototype.windowHeight = function() {
    return 300;
};

Window_TreeList.prototype.maxCols = function() {
    return 3;
};

Window_TreeList.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this.contents.clear();
    this._actor = actor;
    this.refresh();
};

Window_TreeList.prototype.makeItemList = function() {
    if (this._actor) {
        if (this._actor.actorTrees.length < 1) {
            this._data = [];
            return;
        }
        for (i = 0; i < this._actor.actorTrees.length; i++) {
            if (!this._data.contains($dataSkills[this._actor.actorTrees[i]])) {
                this._data.push($dataSkills[this._actor.actorTrees[i]])
            }
        }
    } else {
        this._data = [];
    }
};

Window_TreeList.prototype.drawItem = function(index) {
    var skill = this._data[index];
    if (!skill) return;
    var rect = this.itemRect(index);
    this.changePaintOpacity(this.isEnabled(skill));
    this.drawItemName(skill, rect.x, rect.y, rect.width);
    this.changePaintOpacity(true);
};

Window_TreeList.prototype.update = function() {
    Window_SkillList.prototype.update.call(this);
};

Window_TreeList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_TreeList.prototype.includes = function(item) {
    return item;
};

Window_TreeList.prototype.isEnabled = function(item) {
    if (!this._actor) return false;
    if (item === undefined) return false;
    if (this._actor._skillLevel[item.id] > item.learnMaxLevel - 1) return false;
    var cost = item.requireTreePoints[this._actor._skillLevel[item.id] + 1] || 0
    if (this._actor._skillLevel[0] < cost) return false;
    for (i = 0; i < item.requireTreeSkills.length; i++) {
        if (this._actor._skillLevel[item.requireTreeSkills[i]] < item.requireTreeLevel[i]) return false;
    }
    return true;
};

Window_TreeList.prototype.select = function(index) {
    Window_SkillList.prototype.select.call(this,index);
    if (!this._actor) return 
    var row = this.index();
    this._treeRow = 0;
    if (this._actor.treeMax.length < 1) return;
    for (i = 0; i < this._actor.treeMax.length; i++) {
        if (row >= this._actor.treeMax[i]) {
            row -= this._actor.treeMax[i];
            this._treeRow += 1;
        }
    }
}

Window_TreeList.prototype.cursorUp = function(wrap) {
    var lineMax = 0
    for (i = 0; i < this._treeRow + 1; i++) lineMax += this._actor.treeMax[i];
    var lineMin = lineMax - this._actor.treeMax[this._treeRow]
    var index = this.index();
    if (wrap) {
        if (index > lineMin) this.select(index - 1);
        else if (index <= lineMin) this.select(lineMax - 1);
    }
};

Window_TreeList.prototype.cursorDown = function(wrap) {
    var lineMax = 0
    for (i = 0; i < this._treeRow + 1; i++) lineMax += this._actor.treeMax[i];
    var lineMin = lineMax - this._actor.treeMax[this._treeRow]
    var index = this.index();
    if (wrap) {
        if (index < lineMax - 1) this.select(index + 1);
        else if (index >= lineMax - 1) this.select(lineMin);
    }
};

Window_TreeList.prototype.cursorLeft = function(wrap) {
    var lineMax = 0
    for (i = 0; i < this._treeRow + 1; i++) lineMax += this._actor.treeMax[i];
    var lineMin = lineMax - this._actor.treeMax[this._treeRow]
    var index = this.index();
    if (wrap) {
        if (index > lineMin) this.select(index - 1);
        else if (index <= lineMin) this.select(lineMax - 1);
    }
};

Window_TreeList.prototype.cursorRight = function(wrap) {
    var lineMax = 0
    for (i = 0; i < this._treeRow + 1; i++) lineMax += this._actor.treeMax[i];
    var lineMin = lineMax - this._actor.treeMax[this._treeRow]
    var index = this.index();
    if (wrap) {
        if (index < lineMax - 1) this.select(index + 1);
        else if (index >= lineMax - 1) this.select(lineMin);
    }
};

Window_TreeList.prototype.cursorPageup = function() {
    var max = this._actor.treeMax.length;
    var index = 0;
    if (this._treeRow > 1) {
        for (i = 0; i < this._treeRow - 1; i++) index += this._actor.treeMax[i];
    } else if (this._treeRow < 1){
        for (i = 0; i < this._actor.treeMax.length - 1; i++) index += this._actor.treeMax[i];
    }
    this.select(index);
};

Window_TreeList.prototype.cursorPagedown = function() {
    var max = this._actor.treeMax.length;
    var index = 0;
    for (i = 0; i < this._treeRow + 1; i++) index += this._actor.treeMax[i];
    if (this._treeRow < max - 1) this.select(index)
    else this.select(0);
};

Window_TreeList.prototype.show = function() {
    Window_SkillList.prototype.show.call(this);
    this.select(0);
};

//=============================================================================
// Scene_Tree
//=============================================================================
function Scene_Tree() {
    this.initialize.apply(this, arguments);
}

Scene_Tree.prototype = Object.create(Scene_ItemBase.prototype);
Scene_Tree.prototype.constructor = Scene_Tree;

Scene_Tree.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
};

var _ryo_Scene_Tree_createBackground = Scene_Tree.prototype.createBackground;
Scene_Tree.prototype.createBackground = function() {
    _ryo_Scene_Tree_createBackground.call(this);
    this._field = new Sprite();
    this.addChild(this._field);	
};

Scene_Tree.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createActorWindow();
    this.createItemWindow();
    this.createLayout();
    this.createPoint();
    this.createTreeList1();
    this.createTreeListName();
    this.createActor();
    this.createName();
    this.createInfo();
    this.refreshActor();
};

Scene_Tree.prototype.start = function() {
    Scene_ItemBase.prototype.start.call(this);
    this._blend = [true,0]
};

Scene_Tree.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_TreeHelp();
    this.addWindow(this._helpWindow);
};

Scene_Tree.prototype.createActorWindow = function() {
    this._actorWindow = new Window_TreeActor(0, 0);
    this._actorWindow.x = - this._actorWindow.windowWidth();
    this._actorWindow.setHandler('ok',     this.onActorOk.bind(this));
    this._actorWindow.setHandler('cancel', this.popScene.bind(this));
    this._actorWindow.show();
    this._actorWindow.activate();
    this.addWindow(this._actorWindow);
};

Scene_Tree.prototype.createItemWindow = function() {
    this._itemWindow = new Window_TreeList(0, 200);
    this._itemWindow.x = - this._itemWindow.windowWidth();
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
};

Scene_Tree.prototype.createLayout = function() {
    this._field.removeChild(this._layout)
    this._layout = new Sprite(ImageManager.loadTree('Layout'));
    this._field.addChild(this._layout)
};

Scene_Tree.prototype.createInfo = function() {
    this._field.removeChild(this._info)
    this._info = new Sprite(new Bitmap(700,28));
    this._info.x = Graphics.boxWidth - this._info.width;
    this._info.y = Graphics.boxHeight - this._info.height;
    this._info.bitmap.fontSize = 20;
    this._info.bitmap.outlineWidth = 4;
    this._field.addChild(this._info)
    var info = '按下PgUP/PgDown更换人物，确定键选择人物。';
    this._info.bitmap.drawText(info, 0, 0, this._info.width, this._info.height,"right");
};

Scene_Tree.prototype.createPoint = function() {
    this._field.removeChild(this._point)
    this._point = new Sprite(new Bitmap(100,28));
    this._point.x = Ryo.tree_pointX;
    this._point.y = Ryo.tree_pointY;
    this._point.bitmap.fontSize = 20;
    this._point.bitmap.outlineWidth = 4;
    this._field.addChild(this._point)
};

Scene_Tree.prototype.refreshPoint = function() {
    if (!this._point) return;
    this._point.bitmap.clear();
    var point = this.user()._skillLevel[0];
    this._point.bitmap.drawText(point, 0, 0, this._point.width, this._point.height,"right");
};

Scene_Tree.prototype.createName = function() {
    this._field.removeChild(this._name)
    this._name = new Sprite(new Bitmap(400,100));
    this._name.x = Ryo.tree_nameX;
    this._name.y = Ryo.tree_nameY;
    this._name.bitmap.fontSize = 28;
    this._name.bitmap.outlineWidth = 4;
    this._field.addChild(this._name)
};

Scene_Tree.prototype.createIcon = function() {
    this._field.removeChild(this._skillIcon)
    this._icon = [];
    this._skillIcon = new Sprite();
    this._skillIcon.x = 0
    this._skillIcon.y = 0
    this._field.addChild(this._skillIcon)
    for (i = 0; i < this.user().actorTrees.length; i++) {
        this._icon[i] = new Sprite(ImageManager.loadSystem('IconSet'));
        var skillicon = $dataSkills[this.user().actorTrees[i]].iconIndex;
        var sx = skillicon % 16 * 32;
        var sy = Math.floor(skillicon / 16) * 32;
        this._icon[i].setFrame(sx, sy, 32, 32);
        this._icon[i].x = $dataSkills[this.user().actorTrees[i]].TreePos[0]
        this._icon[i].y = $dataSkills[this.user().actorTrees[i]].TreePos[1]
        this._skillIcon.addChild(this._icon[i])
    }
    this._skillIcon.opacity = 0;
};

Scene_Tree.prototype.createTreeList1 = function() {
    this._field.removeChild(this._list1)
    this._list1 = new Sprite(ImageManager.loadTree('TreeList'));
    this._list1.x = Ryo.tree_list1X
    this._list1.y = Ryo.tree_list1Y
    this._field.addChild(this._list1)
    this._list1.opacity = 0;
};

Scene_Tree.prototype.createTreeListName = function() {
    this._field.removeChild(this._listName)
    this._listName = new Sprite(ImageManager.loadTree('TreeName_' + this.user()._actorId));
    this._listName.x = Ryo.tree_listnameX
    this._listName.y = Ryo.tree_listnameY
    this._field.addChild(this._listName)
    this._listName.opacity = 0;
};

Scene_Tree.prototype.createTreeList2 = function() {
    this._field.removeChild(this._list2)
    this._list2 = new Sprite(ImageManager.loadTree('TreeActor_' + this.user()._actorId));
    this._list2.x = Ryo.tree_list2X
    this._list2.y = Ryo.tree_list2Y
    this._field.addChild(this._list2)
    this._list2.opacity = 0;
};

Scene_Tree.prototype.createSkillLevel = function() {
    this._field.removeChild(this._level)
    this._levelText = [];
    this._level = new Sprite();
    this._level.x = 0
    this._level.y = 0
    this._field.addChild(this._level)
    for (i = 0; i < this.user().actorTrees.length; i++) {
        this._levelText[i] = new Sprite(new Bitmap(100,16));
        var text = this.user()._skillLevel[this.user().actorTrees[i]] + '/' + $dataSkills[this.user().actorTrees[i]].learnMaxLevel
        this._levelText[i].bitmap.fontSize = 12;
        this._levelText[i].bitmap.drawText(text, 0, 0, 100, 16, 'left')
        this._levelText[i].x = $dataSkills[this.user().actorTrees[i]].TreePos[0]
        this._levelText[i].y = $dataSkills[this.user().actorTrees[i]].TreePos[1]
        this._level.addChild(this._levelText[i])
    }
    this._levelText.opacity = 0;
};

Scene_Tree.prototype.createSkillName = function() {
    this._field.removeChild(this._skillName)
    this._skillName = new Sprite(new Bitmap(250,48));
    this._skillName.x = Ryo.tree_skillNameX;
    this._skillName.y = Ryo.tree_skillNameY;
    this._skillName.bitmap.fontSize = 28;
    this._skillName.bitmap.outlineWidth = 4;
    this._field.addChild(this._skillName)
};

Scene_Tree.prototype.createSkillIcon = function() {
    this._field.removeChild(this._skillIcon2)
    this._skillIcon2 = new Sprite(ImageManager.loadSystem("IconSet"));
    this._skillIcon2.x = Ryo.tree_skillIconX
    this._skillIcon2.y = Ryo.tree_skillIconY
    this._field.addChild(this._skillIcon2)
};

Scene_Tree.prototype.refreshName = function() {
    this._name.bitmap.clear();
    var actor = this.user().name();
    var classId = this.user().currentClass();
    this._name.bitmap.drawText(classId, 0, 0, this._name.width, this._name.height, "left")
    this._name.bitmap.drawText(actor, 84, 32, this._name.width, this._name.height, "left")
};

Scene_Tree.prototype.refreshSkillName = function() { 
    this._skillName.bitmap.clear();
    if (this._itemWindow.item() === undefined) return;
    var skillname = $dataSkills[this.user().actorTrees[this._itemWindow.index()]].name || '';
    this._skillName.bitmap.drawText(skillname, 0, 0, 250, 48,"left")
};

Scene_Tree.prototype.refreshSkillIcon = function() {
    if (this._itemWindow.item() === undefined) {
        this._field.removeChild(this._skillIcon2);
        return;
    }
    var skillicon = $dataSkills[this.user().actorTrees[this._itemWindow.index()]].iconIndex || 0;
    var sx = skillicon % 16 * 32;
    var sy = Math.floor(skillicon / 16) * 32;
    this._skillIcon2.setFrame(sx, sy, 32, 32);
};

Scene_Tree.prototype.createActor = function() {
    this.removeChild(this._field._actorBitmap)
    this._actorBitmap = new Sprite();
    this._actorBitmap.x = Ryo.tree_ActorBitX;
    this._actorBitmap.y = Ryo.tree_ActorBitY;
    this._field.addChild(this._actorBitmap)
};

Scene_Tree.prototype.refreshActor = function() {
    var actor = this.user();
    this._itemWindow.setActor(actor);
};

Scene_Tree.prototype.user = function() {
    return this._actorWindow.actor();
};

Scene_Tree.prototype.onActorOk = function() {
    var actor = this.user();
    this._itemWindow.setActor(actor)
    this._itemWindow.activate();
    this._itemWindow.show();
    this._itemWindow.refresh();
    this._actorWindow.hide();
    this._info.bitmap.clear();
    var info = '按下PgUP/PgDown更换天赋栏，方向键选择天赋。';
    this._info.bitmap.drawText(info, 0, 0, this._info.width, this._info.height,"right");
    this._helpWindow.show();
    this._helpWindow.refresh();
    this.createTreeList2();
    this.createIcon();
    this.createSkillLevel();
    this.createSkillName();
    this.createSkillIcon();
    this._field.removeChild(this._name);
};

Scene_Tree.prototype.onItemOk = function() {
    var skill = this._itemWindow.item();
    var actor = this.user();
    if (actor.isLearnedSkill(skill.id)) actor._skillLevel[skill.id] += 1;
    else actor.learnSkill(skill.id)
    var cost = skill.requireTreePoints[actor._skillLevel[skill.id]] || 0
    actor._skillLevel[0] -= cost;
    this._itemWindow.refresh();
    this._itemWindow.activate();
    this._helpWindow.refresh();
    this.createSkillLevel();
};

Scene_Tree.prototype.onItemCancel = function() {
    this._itemWindow.hide();
    this._actorWindow.activate();
    this._actorWindow.show();
    this._actorWindow.select(this.user().index())
    this._info.bitmap.clear();
    var info = '按下PgUP/PgDown更换人物，确定键选择人物。';
    this._info.bitmap.drawText(info, 0, 0, this._info.width, this._info.height,"right");
    this._helpWindow.hide();
    this._field.removeChild(this._skillName)
    this._field.removeChild(this._skillIcon2)
    this.createName();
    this.createTreeListName();
};

Scene_Tree.prototype.playSeForItem = function() {
    SoundManager.playUseSkill();
};

Scene_Tree.prototype.useItem = function() {
    Scene_ItemBase.prototype.useItem.call(this);
    this._itemWindow.refresh();
};

var _ryo_Scene_Tree_update = Scene_Tree.prototype.update;
Scene_Tree.prototype.update = function() {
    _ryo_Scene_Tree_update.call(this);
    if (this._actorWindow.active) {
        this.refreshName();
        this._actorBitmap.bitmap = ImageManager.loadTree('Actor_' + this.user()._actorId)
        if (this._skillIcon) this._skillIcon.opacity -= 20
        if (this._level) this._level.opacity -= 20
        if (this._list1) this._list1.opacity += 20;
        if (this._listName) {
            this._listName.opacity += 20;
            this._listName.bitmap = ImageManager.loadTree('TreeName_' + this.user()._actorId);
        }
        if (this._list2) this._list2.opacity -= 20;
    } else if (this._itemWindow.active){
        if (this._skillIcon) this._skillIcon.opacity += 20
        if (this._level) this._level.opacity += 20
        if (this._list1) this._list1.opacity -= 20;
        if (this._listName) this._listName.opacity -= 20;
        if (this._list2) this._list2.opacity += 20;
        if (this._skillName) this.refreshSkillName();
        if (this._skillIcon2) this.refreshSkillIcon();
        var index = this._itemWindow.index()
        if (this._icon[index]) {
            if (this._blend[0]) {
                this._blend[1] += 5;
                this._icon[index].setBlendColor([255, 255, 255, this._blend[1]]);
                if (this._blend[1] > 160) this._blend[0] = false;
            } else {
                this._blend[1] -= 5;
                this._icon[index].setBlendColor([255, 255, 255, this._blend[1]]);
                if (this._blend[1] <= 40) this._blend[0] = true;
            }
        } 
        for (i = 0; i < this.user().actorTrees.length; i++){
            if (this._icon[i] && i != index) this._icon[i].setBlendColor([255, 255, 255, 0]);
        }
    }
    this.refreshPoint();
};