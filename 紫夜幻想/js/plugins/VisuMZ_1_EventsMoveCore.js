//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.34;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.34] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x303df0=_0x49fd;(function(_0x3fa61e,_0x2e7d2c){const _0x25fa8a=_0x49fd,_0x341162=_0x3fa61e();while(!![]){try{const _0x16ca90=parseInt(_0x25fa8a(0x282))/0x1+-parseInt(_0x25fa8a(0x2de))/0x2*(-parseInt(_0x25fa8a(0x530))/0x3)+parseInt(_0x25fa8a(0x536))/0x4*(parseInt(_0x25fa8a(0x401))/0x5)+parseInt(_0x25fa8a(0x216))/0x6+parseInt(_0x25fa8a(0x592))/0x7*(parseInt(_0x25fa8a(0x5c1))/0x8)+parseInt(_0x25fa8a(0x526))/0x9+parseInt(_0x25fa8a(0x639))/0xa*(-parseInt(_0x25fa8a(0x1b1))/0xb);if(_0x16ca90===_0x2e7d2c)break;else _0x341162['push'](_0x341162['shift']());}catch(_0x5150a0){_0x341162['push'](_0x341162['shift']());}}}(_0x5509,0xc12dc));var label=_0x303df0(0x28b),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x3a82f4){const _0x535a4c=_0x303df0;return _0x3a82f4[_0x535a4c(0x607)]&&_0x3a82f4[_0x535a4c(0x53b)][_0x535a4c(0x37c)]('['+label+']');})[0x0];VisuMZ[label][_0x303df0(0x578)]=VisuMZ[label][_0x303df0(0x578)]||{},VisuMZ[_0x303df0(0x64e)]=function(_0x105c10,_0x263993){const _0x54ba9e=_0x303df0;for(const _0x8b27d2 in _0x263993){if(_0x8b27d2[_0x54ba9e(0x5bf)](/(.*):(.*)/i)){const _0x19da83=String(RegExp['$1']),_0x3621ce=String(RegExp['$2'])['toUpperCase']()[_0x54ba9e(0x573)]();let _0x582d19,_0x399b88,_0xb8c16c;switch(_0x3621ce){case _0x54ba9e(0x485):_0x582d19=_0x263993[_0x8b27d2]!==''?Number(_0x263993[_0x8b27d2]):0x0;break;case'ARRAYNUM':_0x399b88=_0x263993[_0x8b27d2]!==''?JSON[_0x54ba9e(0x533)](_0x263993[_0x8b27d2]):[],_0x582d19=_0x399b88[_0x54ba9e(0x1ee)](_0x101327=>Number(_0x101327));break;case _0x54ba9e(0x685):_0x582d19=_0x263993[_0x8b27d2]!==''?eval(_0x263993[_0x8b27d2]):null;break;case _0x54ba9e(0x525):_0x399b88=_0x263993[_0x8b27d2]!==''?JSON[_0x54ba9e(0x533)](_0x263993[_0x8b27d2]):[],_0x582d19=_0x399b88[_0x54ba9e(0x1ee)](_0xab8073=>eval(_0xab8073));break;case _0x54ba9e(0x369):_0x582d19=_0x263993[_0x8b27d2]!==''?JSON['parse'](_0x263993[_0x8b27d2]):'';break;case'ARRAYJSON':_0x399b88=_0x263993[_0x8b27d2]!==''?JSON[_0x54ba9e(0x533)](_0x263993[_0x8b27d2]):[],_0x582d19=_0x399b88[_0x54ba9e(0x1ee)](_0x3f4196=>JSON[_0x54ba9e(0x533)](_0x3f4196));break;case _0x54ba9e(0x36e):_0x582d19=_0x263993[_0x8b27d2]!==''?new Function(JSON[_0x54ba9e(0x533)](_0x263993[_0x8b27d2])):new Function(_0x54ba9e(0x645));break;case _0x54ba9e(0x4d0):_0x399b88=_0x263993[_0x8b27d2]!==''?JSON[_0x54ba9e(0x533)](_0x263993[_0x8b27d2]):[],_0x582d19=_0x399b88['map'](_0x5a5d4b=>new Function(JSON[_0x54ba9e(0x533)](_0x5a5d4b)));break;case _0x54ba9e(0x2b3):_0x582d19=_0x263993[_0x8b27d2]!==''?String(_0x263993[_0x8b27d2]):'';break;case _0x54ba9e(0x4ad):_0x399b88=_0x263993[_0x8b27d2]!==''?JSON['parse'](_0x263993[_0x8b27d2]):[],_0x582d19=_0x399b88[_0x54ba9e(0x1ee)](_0x2fa661=>String(_0x2fa661));break;case _0x54ba9e(0x68a):_0xb8c16c=_0x263993[_0x8b27d2]!==''?JSON[_0x54ba9e(0x533)](_0x263993[_0x8b27d2]):{},_0x105c10[_0x19da83]={},VisuMZ[_0x54ba9e(0x64e)](_0x105c10[_0x19da83],_0xb8c16c);continue;case _0x54ba9e(0x2a4):_0x399b88=_0x263993[_0x8b27d2]!==''?JSON[_0x54ba9e(0x533)](_0x263993[_0x8b27d2]):[],_0x582d19=_0x399b88['map'](_0x4ca45c=>VisuMZ[_0x54ba9e(0x64e)]({},JSON['parse'](_0x4ca45c)));break;default:continue;}_0x105c10[_0x19da83]=_0x582d19;}}return _0x105c10;},(_0x32d932=>{const _0x50f8ee=_0x303df0,_0x45493b=_0x32d932[_0x50f8ee(0x482)];for(const _0x1a00fa of dependencies){if(!Imported[_0x1a00fa]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x45493b,_0x1a00fa)),SceneManager[_0x50f8ee(0x358)]();break;}}const _0x32a35f=_0x32d932[_0x50f8ee(0x53b)];if(_0x32a35f[_0x50f8ee(0x5bf)](/\[Version[ ](.*?)\]/i)){const _0x5902ec=Number(RegExp['$1']);_0x5902ec!==VisuMZ[label][_0x50f8ee(0x5e5)]&&('ZiDTC'===_0x50f8ee(0x609)?(this['removeTemporaryMapSpawnedEvents'](_0x170739),this[_0x50f8ee(0x629)](),_0x548a68[_0x50f8ee(0x28b)][_0x50f8ee(0x584)][_0x50f8ee(0x249)](this,_0x2ee1fd),this[_0x50f8ee(0x629)](),this[_0x50f8ee(0x1c7)](),this['setupRegionRestrictions'](),this[_0x50f8ee(0x4d3)](),this[_0x50f8ee(0x443)](),this['setupPlayerVisibilityOverrides'](),this[_0x50f8ee(0x62f)](),this[_0x50f8ee(0x629)]()):(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x45493b,_0x5902ec)),SceneManager[_0x50f8ee(0x358)]()));}if(_0x32a35f[_0x50f8ee(0x5bf)](/\[Tier[ ](\d+)\]/i)){if(_0x50f8ee(0x298)!==_0x50f8ee(0x2d1)){const _0x4df00b=Number(RegExp['$1']);if(_0x4df00b<tier){if('DEeMd'!==_0x50f8ee(0x480))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x50f8ee(0x660)](_0x45493b,_0x4df00b,tier)),SceneManager[_0x50f8ee(0x358)]();else{let _0x1d06a9=[0x0,0x0,_0x50f8ee(0x386)[_0x50f8ee(0x660)](_0x217a26,_0x5f3adf)];return _0x5a0415[_0x50f8ee(0x5a6)](_0x1d06a9);}}else _0x50f8ee(0x5e8)===_0x50f8ee(0x211)?(this['_selfTargetNumberInput']=_0x52aa38[_0x50f8ee(0x47f)](),_0x37cb65[_0x50f8ee(0x28b)][_0x50f8ee(0x34a)][_0x50f8ee(0x249)](this,_0x30fc0c,_0x2ec2a9)):tier=Math[_0x50f8ee(0x399)](_0x4df00b,tier);}else{if(this[_0x50f8ee(0x278)]===_0x4549a6&&this['isInVehicle']())return this[_0x50f8ee(0x3db)]()[_0x50f8ee(0x508)]()[_0x50f8ee(0x5bf)](/\[VS8\]/i);else return _0x5ebf62[_0x50f8ee(0x684)]&&this[_0x50f8ee(0x371)]()?!![]:this[_0x50f8ee(0x508)]()[_0x50f8ee(0x5bf)](/\[VS8\]/i);}}VisuMZ[_0x50f8ee(0x64e)](VisuMZ[label]['Settings'],_0x32d932[_0x50f8ee(0x3c4)]);})(pluginData),VisuMZ[_0x303df0(0x576)]=function(_0x1c6345,_0x19b401,_0x148063){switch(_0x148063){case'=':return _0x19b401;break;case'+':return _0x1c6345+_0x19b401;break;case'-':return _0x1c6345-_0x19b401;break;case'*':return _0x1c6345*_0x19b401;break;case'/':return _0x1c6345/_0x19b401;break;case'%':return _0x1c6345%_0x19b401;break;}return _0x1c6345;},PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],_0x303df0(0x509),_0xa4b33=>{const _0x1a7e84=_0x303df0;VisuMZ[_0x1a7e84(0x64e)](_0xa4b33,_0xa4b33);switch(_0xa4b33[_0x1a7e84(0x580)]){case'Allow':$gameSystem[_0x1a7e84(0x3aa)](!![]);break;case'Stop':$gameSystem[_0x1a7e84(0x3aa)](![]);break;case _0x1a7e84(0x614):$gameSystem[_0x1a7e84(0x3aa)](!$gameSystem[_0x1a7e84(0x662)]());break;}}),PluginManager['registerCommand'](pluginData['name'],'CallEvent',_0x1e4e6d=>{const _0x5e3bf6=_0x303df0;VisuMZ['ConvertParams'](_0x1e4e6d,_0x1e4e6d);const _0xdb3c8e=$gameTemp[_0x5e3bf6(0x2bb)](),_0xdc4771={'mapId':_0x1e4e6d[_0x5e3bf6(0x463)],'eventId':_0x1e4e6d[_0x5e3bf6(0x353)]||_0xdb3c8e[_0x5e3bf6(0x68d)](),'pageId':_0x1e4e6d[_0x5e3bf6(0x1e7)]};if(_0xdc4771[_0x5e3bf6(0x2c6)]<=0x0)_0xdc4771['mapId']=$gameMap?$gameMap['mapId']():0x1;$gameTemp['getLastPluginCommandInterpreter']()['pluginCommandCallEvent'](_0xdc4771);}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],'DashEnableToggle',_0x853708=>{const _0x11a7d3=_0x303df0;VisuMZ['ConvertParams'](_0x853708,_0x853708);switch(_0x853708[_0x11a7d3(0x580)]){case _0x11a7d3(0x61c):$gameSystem[_0x11a7d3(0x2b8)](!![]);break;case'Disable':$gameSystem[_0x11a7d3(0x2b8)](![]);break;case'Toggle':$gameSystem[_0x11a7d3(0x2b8)](!$gameSystem[_0x11a7d3(0x575)]());break;}}),PluginManager['registerCommand'](pluginData[_0x303df0(0x482)],_0x303df0(0x28d),_0x410a80=>{const _0x5932de=_0x303df0;VisuMZ[_0x5932de(0x64e)](_0x410a80,_0x410a80);const _0x57d54c=$gameTemp[_0x5932de(0x2bb)]();_0x410a80['MapId']=_0x410a80[_0x5932de(0x463)]||$gameMap[_0x5932de(0x2c6)](),$gameSystem[_0x5932de(0x612)](_0x410a80[_0x5932de(0x463)],_0x410a80[_0x5932de(0x353)]||_0x57d54c[_0x5932de(0x68d)](),_0x410a80[_0x5932de(0x495)],_0x410a80[_0x5932de(0x490)],_0x410a80[_0x5932de(0x416)],_0x410a80[_0x5932de(0x5b7)]);}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],'EventIconDelete',_0x5c3b4b=>{const _0x3ebeda=_0x303df0;VisuMZ[_0x3ebeda(0x64e)](_0x5c3b4b,_0x5c3b4b);const _0x37f919=$gameTemp['getLastPluginCommandInterpreter']();_0x5c3b4b[_0x3ebeda(0x463)]=_0x5c3b4b[_0x3ebeda(0x463)]||$gameMap['mapId'](),$gameSystem['deleteIconsOnEventsDataKey'](_0x5c3b4b[_0x3ebeda(0x463)],_0x5c3b4b['EventId']||_0x37f919[_0x3ebeda(0x68d)]());}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],_0x303df0(0x364),_0x450abc=>{const _0x2792ea=_0x303df0;if($gameMap)for(const _0x23103d of $gameMap[_0x2792ea(0x659)]()){_0x23103d[_0x2792ea(0x4ca)]();}}),PluginManager['registerCommand'](pluginData[_0x303df0(0x482)],_0x303df0(0x63e),_0xe05d1e=>{const _0x34692f=_0x303df0;VisuMZ[_0x34692f(0x64e)](_0xe05d1e,_0xe05d1e);switch(_0xe05d1e[_0x34692f(0x260)]){case _0x34692f(0x1ab):$gameSystem[_0x34692f(0x32e)](!![]);break;case'Hidden':$gameSystem[_0x34692f(0x32e)](![]);break;case'Toggle':$gameSystem[_0x34692f(0x32e)](!$gameSystem[_0x34692f(0x4da)]());break;}}),PluginManager['registerCommand'](pluginData[_0x303df0(0x482)],'EventLocationSave',_0x1e2fdb=>{const _0x1c36da=_0x303df0;VisuMZ['ConvertParams'](_0x1e2fdb,_0x1e2fdb);const _0xd632a7=$gameTemp[_0x1c36da(0x2bb)]();if(!$gameMap)return;const _0x473ebb=$gameMap[_0x1c36da(0x5db)](_0x1e2fdb[_0x1c36da(0x353)]||_0xd632a7[_0x1c36da(0x68d)]());if(_0x473ebb)_0x473ebb[_0x1c36da(0x42c)]();}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],_0x303df0(0x522),_0x2b93b1=>{const _0x24bd33=_0x303df0;VisuMZ[_0x24bd33(0x64e)](_0x2b93b1,_0x2b93b1);const _0x2f8d31=$gameTemp['getLastPluginCommandInterpreter'](),_0x1aaa25=_0x2b93b1[_0x24bd33(0x463)]||$gameMap[_0x24bd33(0x2c6)](),_0x5c9ba8=_0x2b93b1[_0x24bd33(0x353)]||_0x2f8d31[_0x24bd33(0x68d)](),_0x3ced12=_0x2b93b1[_0x24bd33(0x5f7)]||0x0,_0x3e05b3=_0x2b93b1[_0x24bd33(0x321)]||0x0,_0x3010a8=_0x2b93b1[_0x24bd33(0x532)]||0x2,_0x35fdac=((_0x2b93b1[_0x24bd33(0x1e7)]||0x1)-0x1)['clamp'](0x0,0x13),_0x54b152=_0x2b93b1[_0x24bd33(0x5a4)]||0x0;$gameSystem[_0x24bd33(0x52c)](_0x1aaa25,_0x5c9ba8,_0x3ced12,_0x3e05b3,_0x3010a8,_0x35fdac,_0x54b152);}),PluginManager['registerCommand'](pluginData[_0x303df0(0x482)],_0x303df0(0x214),_0x2b7e52=>{const _0x16dd4c=_0x303df0;VisuMZ[_0x16dd4c(0x64e)](_0x2b7e52,_0x2b7e52);const _0x460991=$gameTemp['getLastPluginCommandInterpreter'](),_0x56257e=_0x2b7e52['MapId']||$gameMap[_0x16dd4c(0x2c6)](),_0x8e6821=_0x2b7e52['EventId']||_0x460991[_0x16dd4c(0x68d)]();$gameSystem[_0x16dd4c(0x534)](_0x56257e,_0x8e6821);}),PluginManager['registerCommand'](pluginData[_0x303df0(0x482)],_0x303df0(0x398),_0x5c7290=>{const _0x32a5b9=_0x303df0;VisuMZ[_0x32a5b9(0x64e)](_0x5c7290,_0x5c7290);const _0x2e8706=_0x5c7290[_0x32a5b9(0x44e)];$gameTimer['setCommonEvent'](_0x2e8706);}),PluginManager['registerCommand'](pluginData[_0x303df0(0x482)],_0x303df0(0x213),_0xc41872=>{$gameTimer['setCommonEvent'](0x0);}),PluginManager['registerCommand'](pluginData[_0x303df0(0x482)],_0x303df0(0x4a5),_0x127b89=>{const _0x55490b=_0x303df0;if(!$gameTimer['isWorking']())return;VisuMZ[_0x55490b(0x64e)](_0x127b89,_0x127b89);let _0x3a059d=0x0;_0x3a059d+=_0x127b89[_0x55490b(0x24a)],_0x3a059d+=_0x127b89['Seconds']*0x3c,_0x3a059d+=_0x127b89[_0x55490b(0x41d)]*0x3c*0x3c,_0x3a059d+=_0x127b89['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x55490b(0x287)](_0x3a059d);}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],_0x303df0(0x604),_0x161eb7=>{const _0x5e51b6=_0x303df0;if(!$gameTimer[_0x5e51b6(0x1e9)]())return;VisuMZ['ConvertParams'](_0x161eb7,_0x161eb7);let _0x31d962=0x0;_0x31d962+=_0x161eb7[_0x5e51b6(0x24a)],_0x31d962+=_0x161eb7[_0x5e51b6(0x3ca)]*0x3c,_0x31d962+=_0x161eb7[_0x5e51b6(0x41d)]*0x3c*0x3c,_0x31d962+=_0x161eb7[_0x5e51b6(0x551)]*0x3c*0x3c*0x3c,$gameTimer[_0x5e51b6(0x247)](_0x31d962);}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],_0x303df0(0x618),_0x54dd98=>{const _0x56ad34=_0x303df0;if(!$gameTimer['isWorking']())return;$gameTimer[_0x56ad34(0x5b6)]();}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],_0x303df0(0x3b4),_0x3a8466=>{const _0x10a082=_0x303df0;if(!$gameTimer[_0x10a082(0x1e9)]())return;$gameTimer[_0x10a082(0x268)]();}),PluginManager[_0x303df0(0x626)](pluginData['name'],'EventTimerSpeed',_0x5699cb=>{const _0x113609=_0x303df0;VisuMZ[_0x113609(0x64e)](_0x5699cb,_0x5699cb);const _0x4da138=_0x5699cb[_0x113609(0x1d4)]||0x0;$gameTimer['changeSpeed'](_0x4da138);}),PluginManager[_0x303df0(0x626)](pluginData['name'],_0x303df0(0x4b7),_0x4b8a9e=>{const _0x1328c7=_0x303df0;VisuMZ[_0x1328c7(0x64e)](_0x4b8a9e,_0x4b8a9e);const _0x27c3be=!_0x4b8a9e[_0x1328c7(0x435)];$gameSystem[_0x1328c7(0x431)](_0x27c3be);}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],_0x303df0(0x23b),_0x3a2761=>{const _0x7b6bdb=_0x303df0;VisuMZ[_0x7b6bdb(0x64e)](_0x3a2761,_0x3a2761);const _0x1adfc0=(_0x3a2761[_0x7b6bdb(0x5bc)]||0x0)-0x1,_0x381040=!_0x3a2761[_0x7b6bdb(0x435)],_0xc9a422=$gamePlayer[_0x7b6bdb(0x666)]()[_0x7b6bdb(0x4e9)](_0x1adfc0);if(_0xc9a422)_0xc9a422[_0x7b6bdb(0x26d)](_0x381040);}),PluginManager[_0x303df0(0x626)](pluginData['name'],_0x303df0(0x196),_0x405fdd=>{const _0x3e923a=_0x303df0;VisuMZ[_0x3e923a(0x64e)](_0x405fdd,_0x405fdd);const _0x1b3e33=_0x405fdd[_0x3e923a(0x5bc)];$gameSystem['setControlledFollowerID'](_0x1b3e33);}),PluginManager['registerCommand'](pluginData[_0x303df0(0x482)],_0x303df0(0x672),_0x246d0d=>{const _0x2187ed=_0x303df0;VisuMZ[_0x2187ed(0x64e)](_0x246d0d,_0x246d0d),$gameSystem[_0x2187ed(0x236)](0x0),$gameSystem[_0x2187ed(0x431)](![]);for(const _0x2501a0 of $gamePlayer[_0x2187ed(0x666)]()[_0x2187ed(0x4e3)]){if('uuKlQ'===_0x2187ed(0x3c6))this[_0x2187ed(0x5b9)]=_0x3468b8;else{if(_0x2501a0)_0x2501a0[_0x2187ed(0x26d)](![]);}}}),PluginManager['registerCommand'](pluginData[_0x303df0(0x482)],_0x303df0(0x506),_0x2c58cc=>{const _0x16ad1c=_0x303df0;VisuMZ[_0x16ad1c(0x64e)](_0x2c58cc,_0x2c58cc);const _0x7b34d5=$gameTemp[_0x16ad1c(0x2bb)]();_0x2c58cc[_0x16ad1c(0x463)]=_0x2c58cc['MapId']||$gameMap[_0x16ad1c(0x2c6)]();const _0x3e9880=[_0x2c58cc[_0x16ad1c(0x463)],_0x2c58cc[_0x16ad1c(0x353)]||_0x7b34d5[_0x16ad1c(0x68d)](),_0x2c58cc[_0x16ad1c(0x61e)]],_0x519ba7=_0x2c58cc['TargetSwitchId'],_0x4eda79=$gameSelfSwitches[_0x16ad1c(0x5a6)](_0x3e9880)||![];$gameSwitches['setValue'](_0x519ba7,_0x4eda79);}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],_0x303df0(0x275),_0x178c9d=>{const _0x518497=_0x303df0;VisuMZ[_0x518497(0x64e)](_0x178c9d,_0x178c9d);const _0x20b81b=$gameTemp[_0x518497(0x2bb)]();_0x178c9d[_0x518497(0x463)]=_0x178c9d['MapId']||$gameMap[_0x518497(0x2c6)]();const _0x213abe=[_0x178c9d[_0x518497(0x463)],_0x178c9d[_0x518497(0x353)]||_0x20b81b[_0x518497(0x68d)](),_0x518497(0x48e)['format'](_0x178c9d['SwitchId'])],_0x58613c=_0x178c9d['TargetSwitchId'],_0x2f5bf9=$gameSelfSwitches[_0x518497(0x5a6)](_0x213abe)||![];$gameSwitches[_0x518497(0x680)](_0x58613c,_0x2f5bf9);}),PluginManager[_0x303df0(0x626)](pluginData['name'],_0x303df0(0x63f),_0xeaa1cb=>{const _0x34d709=_0x303df0;VisuMZ[_0x34d709(0x64e)](_0xeaa1cb,_0xeaa1cb);const _0x556754=$gameTemp[_0x34d709(0x2bb)]();_0xeaa1cb[_0x34d709(0x463)]=_0xeaa1cb[_0x34d709(0x463)]||$gameMap[_0x34d709(0x2c6)]();const _0x5cb922=[_0xeaa1cb[_0x34d709(0x463)],_0xeaa1cb[_0x34d709(0x353)]||_0x556754['eventId'](),'Self\x20Variable\x20%1'[_0x34d709(0x660)](_0xeaa1cb[_0x34d709(0x493)])],_0x1959f6=_0xeaa1cb[_0x34d709(0x564)],_0x15e763=$gameSelfSwitches[_0x34d709(0x5a6)](_0x5cb922)||![];$gameVariables[_0x34d709(0x680)](_0x1959f6,_0x15e763);}),PluginManager[_0x303df0(0x626)](pluginData['name'],'MorphEventTo',_0x39ec30=>{const _0xcd8238=_0x303df0;VisuMZ['ConvertParams'](_0x39ec30,_0x39ec30);if(!$gameMap)return;const _0x4b48ab=$gameTemp[_0xcd8238(0x2bb)](),_0x5addfd=_0x39ec30['Step2Preserve'];_0x39ec30[_0xcd8238(0x511)]=_0x39ec30['Step1MapId']||$gameMap[_0xcd8238(0x2c6)](),_0x39ec30[_0xcd8238(0x1df)]=_0x39ec30[_0xcd8238(0x1df)]||$gameMap[_0xcd8238(0x2c6)](),_0x39ec30[_0xcd8238(0x387)]=_0x39ec30[_0xcd8238(0x387)][_0xcd8238(0x4dc)]()[_0xcd8238(0x573)]();if(!_0x5addfd&&_0x39ec30[_0xcd8238(0x511)]!==$gameMap[_0xcd8238(0x2c6)]())return;if($gameMap[_0xcd8238(0x2c6)]()===_0x39ec30['Step1MapId']){const _0xfc40ed=$gameMap[_0xcd8238(0x5db)](_0x39ec30[_0xcd8238(0x33f)]||_0x4b48ab[_0xcd8238(0x68d)]());if(!_0xfc40ed)return;if(_0x39ec30[_0xcd8238(0x387)]!==_0xcd8238(0x38b))_0xfc40ed[_0xcd8238(0x5e7)](_0x39ec30[_0xcd8238(0x387)]);else{if(_0xcd8238(0x47b)===_0xcd8238(0x47b))_0xfc40ed[_0xcd8238(0x5af)](_0x39ec30[_0xcd8238(0x1df)],_0x39ec30[_0xcd8238(0x3be)]||_0x4b48ab[_0xcd8238(0x68d)]());else return![];}}_0x5addfd&&(_0xcd8238(0x57a)===_0xcd8238(0x624)?this[_0xcd8238(0x36c)]=_0x4f62ad:$gameSystem[_0xcd8238(0x4a6)](_0x39ec30[_0xcd8238(0x511)],_0x39ec30[_0xcd8238(0x33f)],_0x39ec30[_0xcd8238(0x387)],_0x39ec30['Step2MapId'],_0x39ec30[_0xcd8238(0x3be)]));}),PluginManager['registerCommand'](pluginData[_0x303df0(0x482)],_0x303df0(0x588),_0x10b79f=>{const _0x23545c=_0x303df0;VisuMZ[_0x23545c(0x64e)](_0x10b79f,_0x10b79f);if(!$gameMap)return;const _0x23009c=$gameTemp[_0x23545c(0x2bb)]();_0x10b79f[_0x23545c(0x463)]=_0x10b79f[_0x23545c(0x463)]||$gameMap[_0x23545c(0x2c6)]();if($gameMap[_0x23545c(0x2c6)]()===_0x10b79f['MapId']){const _0x4b6784=$gameMap[_0x23545c(0x5db)](_0x10b79f[_0x23545c(0x353)]||_0x23009c[_0x23545c(0x68d)]());_0x4b6784['removeMorph']();}_0x10b79f[_0x23545c(0x3a6)]&&$gameSystem['deletePreservedMorphEventDataKey'](_0x10b79f[_0x23545c(0x463)],_0x10b79f[_0x23545c(0x353)]||_0x23009c[_0x23545c(0x68d)]());}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],_0x303df0(0x325),_0x3bcd99=>{const _0x1eaa1f=_0x303df0;VisuMZ[_0x1eaa1f(0x64e)](_0x3bcd99,_0x3bcd99),$gameSystem['setPlayerControlDisable'](!_0x3bcd99[_0x1eaa1f(0x61c)]);}),PluginManager[_0x303df0(0x626)](pluginData['name'],_0x303df0(0x31f),_0x156c5b=>{const _0x209391=_0x303df0;VisuMZ[_0x209391(0x64e)](_0x156c5b,_0x156c5b),$gameSystem[_0x209391(0x682)](_0x156c5b[_0x209391(0x503)]);}),PluginManager['registerCommand'](pluginData[_0x303df0(0x482)],_0x303df0(0x33b),_0x5a9d18=>{const _0x469a3f=_0x303df0;VisuMZ[_0x469a3f(0x64e)](_0x5a9d18,_0x5a9d18),$gameSystem['setEventIconData']($gamePlayer,_0x5a9d18['IconIndex'],_0x5a9d18[_0x469a3f(0x490)],_0x5a9d18[_0x469a3f(0x416)],_0x5a9d18['IconBlendMode']);}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],_0x303df0(0x3fa),_0x48a6d6=>{const _0x3a9ead=_0x303df0;VisuMZ[_0x3a9ead(0x64e)](_0x48a6d6,_0x48a6d6),$gameSystem[_0x3a9ead(0x52a)]($gamePlayer);}),PluginManager[_0x303df0(0x626)](pluginData['name'],_0x303df0(0x292),_0x3a21e5=>{const _0x4249b8=_0x303df0;VisuMZ[_0x4249b8(0x64e)](_0x3a21e5,_0x3a21e5);const _0x111d88=$gameTemp[_0x4249b8(0x2bb)]();_0x3a21e5[_0x4249b8(0x463)]=_0x3a21e5['MapId']||$gameMap[_0x4249b8(0x2c6)]();const _0x4e58d7=[_0x3a21e5['MapId'],_0x3a21e5[_0x4249b8(0x353)]||_0x111d88[_0x4249b8(0x68d)](),_0x3a21e5[_0x4249b8(0x61e)]];switch(_0x3a21e5[_0x4249b8(0x580)]){case'ON':$gameSelfSwitches[_0x4249b8(0x680)](_0x4e58d7,!![]);break;case'OFF':$gameSelfSwitches[_0x4249b8(0x680)](_0x4e58d7,![]);break;case _0x4249b8(0x614):$gameSelfSwitches[_0x4249b8(0x680)](_0x4e58d7,!$gameSelfSwitches[_0x4249b8(0x5a6)](_0x4e58d7));break;}}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],_0x303df0(0x62e),_0x5918ce=>{const _0x557424=_0x303df0;VisuMZ[_0x557424(0x64e)](_0x5918ce,_0x5918ce);const _0x39235f=$gameTemp[_0x557424(0x2bb)]();_0x5918ce['MapId']=_0x5918ce['MapId']||$gameMap['mapId']();const _0x5c77e8=[_0x5918ce['MapId'],_0x5918ce[_0x557424(0x353)]||_0x39235f['eventId'](),_0x557424(0x48e)[_0x557424(0x660)](_0x5918ce[_0x557424(0x55a)])];switch(_0x5918ce[_0x557424(0x580)]){case'ON':$gameSelfSwitches[_0x557424(0x680)](_0x5c77e8,!![]);break;case _0x557424(0x5e6):$gameSelfSwitches[_0x557424(0x680)](_0x5c77e8,![]);break;case _0x557424(0x614):$gameSelfSwitches['setValue'](_0x5c77e8,!$gameSelfSwitches['value'](_0x5c77e8));break;}}),PluginManager['registerCommand'](pluginData['name'],_0x303df0(0x52f),_0x247b02=>{const _0x4a8649=_0x303df0;VisuMZ[_0x4a8649(0x64e)](_0x247b02,_0x247b02);const _0x4f18e5=$gameTemp[_0x4a8649(0x2bb)]();_0x247b02[_0x4a8649(0x463)]=_0x247b02[_0x4a8649(0x463)]||$gameMap[_0x4a8649(0x2c6)]();const _0xf71e17=[_0x247b02['MapId'],_0x247b02[_0x4a8649(0x353)]||_0x4f18e5[_0x4a8649(0x68d)](),_0x4a8649(0x18a)['format'](_0x247b02[_0x4a8649(0x493)])],_0x55d930=VisuMZ['OperateValues']($gameSelfSwitches[_0x4a8649(0x5a6)](_0xf71e17),_0x247b02[_0x4a8649(0x580)],_0x247b02[_0x4a8649(0x4db)]);$gameSelfSwitches['setValue'](_0xf71e17,_0x55d930);}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],_0x303df0(0x67a),_0x50d8eb=>{const _0x170824=_0x303df0;VisuMZ[_0x170824(0x64e)](_0x50d8eb,_0x50d8eb);const _0x20c6ca=$gameTemp[_0x170824(0x2bb)](),_0x527e1a={'template':_0x50d8eb[_0x170824(0x387)],'mapId':_0x50d8eb[_0x170824(0x463)]||$gameMap[_0x170824(0x2c6)](),'eventId':_0x50d8eb[_0x170824(0x353)]||_0x20c6ca[_0x170824(0x68d)](),'x':_0x50d8eb[_0x170824(0x5f7)],'y':_0x50d8eb[_0x170824(0x321)],'spawnPreserved':_0x50d8eb[_0x170824(0x373)],'spawnEventId':$gameMap[_0x170824(0x4ab)][_0x170824(0x21b)]+0x3e8},_0x397432=_0x50d8eb[_0x170824(0x524)]||0x0;if(!VisuMZ['PreloadedMaps'][_0x527e1a[_0x170824(0x2c6)]]&&_0x527e1a[_0x170824(0x2c6)]!==$gameMap['mapId']()){let _0x5b086b=_0x170824(0x481)[_0x170824(0x660)](_0x527e1a[_0x170824(0x2c6)]);_0x5b086b+=_0x170824(0x310),_0x5b086b+=_0x170824(0x303),_0x5b086b+=_0x170824(0x424),_0x5b086b+=_0x170824(0x407)[_0x170824(0x660)](_0x527e1a[_0x170824(0x2c6)]),alert(_0x5b086b);return;}const _0x43072b=$gameMap[_0x170824(0x429)](_0x527e1a,_0x50d8eb[_0x170824(0x4c2)],_0x50d8eb[_0x170824(0x31d)]);_0x397432&&$gameSwitches[_0x170824(0x680)](_0x397432,!!_0x43072b);}),PluginManager[_0x303df0(0x626)](pluginData['name'],_0x303df0(0x1ba),_0x36ffb6=>{const _0x465633=_0x303df0;VisuMZ['ConvertParams'](_0x36ffb6,_0x36ffb6);const _0x1c84a1=$gameTemp[_0x465633(0x2bb)](),_0x218430={'template':_0x36ffb6[_0x465633(0x387)],'mapId':_0x36ffb6['MapId']||$gameMap[_0x465633(0x2c6)](),'eventId':_0x36ffb6['EventId']||_0x1c84a1[_0x465633(0x68d)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x36ffb6[_0x465633(0x373)],'spawnEventId':$gameMap[_0x465633(0x4ab)]['length']+0x3e8},_0x533aad=_0x36ffb6[_0x465633(0x524)]||0x0;if(!VisuMZ['PreloadedMaps'][_0x218430[_0x465633(0x2c6)]]&&_0x218430['mapId']!==$gameMap[_0x465633(0x2c6)]()){if(_0x465633(0x476)!=='qKoFk'){let _0x280b0f=_0x465633(0x481)['format'](_0x218430[_0x465633(0x2c6)]);_0x280b0f+=_0x465633(0x310),_0x280b0f+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x280b0f+=_0x465633(0x424),_0x280b0f+=_0x465633(0x407)[_0x465633(0x660)](_0x218430[_0x465633(0x2c6)]),alert(_0x280b0f);return;}else return _0x24964b[_0x465633(0x330)]['includes'](_0x10da01)||_0x19ed2e['WalkAllow']['includes'](_0x3e4442);}const _0x1d978d=$gameMap['prepareSpawnedEventAtRegion'](_0x218430,_0x36ffb6[_0x465633(0x418)],_0x36ffb6[_0x465633(0x4c2)],_0x36ffb6['Passability']);_0x533aad&&$gameSwitches[_0x465633(0x680)](_0x533aad,!!_0x1d978d);}),PluginManager['registerCommand'](pluginData['name'],_0x303df0(0x59d),_0x588f2e=>{const _0xabc605=_0x303df0;VisuMZ[_0xabc605(0x64e)](_0x588f2e,_0x588f2e);const _0x5b49dc=$gameTemp['getLastPluginCommandInterpreter'](),_0x215d24={'template':_0x588f2e[_0xabc605(0x387)],'mapId':_0x588f2e[_0xabc605(0x463)]||$gameMap['mapId'](),'eventId':_0x588f2e[_0xabc605(0x353)]||_0x5b49dc['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x588f2e[_0xabc605(0x373)],'spawnEventId':$gameMap['_spawnedEvents']['length']+0x3e8},_0x5bbbd3=_0x588f2e[_0xabc605(0x524)]||0x0;if(!VisuMZ[_0xabc605(0x372)][_0x215d24[_0xabc605(0x2c6)]]&&_0x215d24['mapId']!==$gameMap[_0xabc605(0x2c6)]()){let _0x2bcc14=_0xabc605(0x481)['format'](_0x215d24[_0xabc605(0x2c6)]);_0x2bcc14+=_0xabc605(0x310),_0x2bcc14+=_0xabc605(0x303),_0x2bcc14+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x2bcc14+=_0xabc605(0x407)[_0xabc605(0x660)](_0x215d24['mapId']),alert(_0x2bcc14);return;}const _0x30f2ea=$gameMap['prepareSpawnedEventAtTerrainTag'](_0x215d24,_0x588f2e[_0xabc605(0x449)],_0x588f2e['Collision'],_0x588f2e[_0xabc605(0x31d)]);_0x5bbbd3&&$gameSwitches[_0xabc605(0x680)](_0x5bbbd3,!!_0x30f2ea);}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],'SpawnEventDespawnEventID',_0x27dd8c=>{const _0x4272e0=_0x303df0;VisuMZ[_0x4272e0(0x64e)](_0x27dd8c,_0x27dd8c);const _0x3a9fdb=$gameTemp[_0x4272e0(0x2bb)]();$gameMap[_0x4272e0(0x44a)](_0x27dd8c['EventID']||_0x3a9fdb['eventId']());}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],_0x303df0(0x4cb),_0x2a532a=>{const _0x34841e=_0x303df0;VisuMZ[_0x34841e(0x64e)](_0x2a532a,_0x2a532a);const _0x546b12=_0x2a532a[_0x34841e(0x5f7)],_0x2157e4=_0x2a532a[_0x34841e(0x321)];$gameMap['despawnAtXY'](_0x546b12,_0x2157e4);}),PluginManager[_0x303df0(0x626)](pluginData[_0x303df0(0x482)],_0x303df0(0x191),_0x19ebb3=>{VisuMZ['ConvertParams'](_0x19ebb3,_0x19ebb3),$gameMap['despawnRegions'](_0x19ebb3['Region']);}),PluginManager['registerCommand'](pluginData[_0x303df0(0x482)],_0x303df0(0x53f),_0x4a11a3=>{const _0x33928d=_0x303df0;VisuMZ[_0x33928d(0x64e)](_0x4a11a3,_0x4a11a3),$gameMap['despawnTerrainTags'](_0x4a11a3[_0x33928d(0x449)]);}),PluginManager[_0x303df0(0x626)](pluginData['name'],_0x303df0(0x2c7),_0x3b5cb1=>{const _0x8eadbe=_0x303df0;VisuMZ[_0x8eadbe(0x64e)](_0x3b5cb1,_0x3b5cb1),$gameMap[_0x8eadbe(0x192)]();}),VisuMZ['EventsMoveCore']['Scene_Boot_onDatabaseLoaded']=Scene_Boot['prototype'][_0x303df0(0x651)],Scene_Boot[_0x303df0(0x2e5)][_0x303df0(0x651)]=function(){const _0x358198=_0x303df0;VisuMZ[_0x358198(0x28b)][_0x358198(0x68b)][_0x358198(0x249)](this),this['process_VisuMZ_EventsMoveCore_LoadTemplateMaps'](),this['process_VisuMZ_EventsMoveCore_Switches_Variables']();if(VisuMZ['EventsMoveCore'][_0x358198(0x4a8)])VisuMZ[_0x358198(0x28b)][_0x358198(0x4a8)][_0x358198(0x1ff)]();},VisuMZ[_0x303df0(0x372)]=[],VisuMZ[_0x303df0(0x203)]={},Scene_Boot['prototype'][_0x303df0(0x394)]=function(){const _0x5903cf=_0x303df0;if(DataManager[_0x5903cf(0x1af)]()||DataManager[_0x5903cf(0x5c3)]())return;const _0xa3f6e4=VisuMZ[_0x5903cf(0x28b)][_0x5903cf(0x578)]['Template'],_0x31eb7c=_0xa3f6e4['PreloadMaps']['slice'](0x0);for(const _0x570e3f of _0xa3f6e4[_0x5903cf(0x215)]){_0x570e3f[_0x5903cf(0x45b)]=_0x570e3f['Name'][_0x5903cf(0x4dc)]()['trim'](),VisuMZ[_0x5903cf(0x203)][_0x570e3f[_0x5903cf(0x45b)]]=_0x570e3f;if(!_0x31eb7c['includes'](_0x570e3f[_0x5903cf(0x4d9)]))_0x31eb7c[_0x5903cf(0x1bc)](_0x570e3f[_0x5903cf(0x4d9)]);}for(const _0x151c12 of _0x31eb7c){if(VisuMZ[_0x5903cf(0x372)][_0x151c12])continue;const _0x1f0581=_0x5903cf(0x1bb)[_0x5903cf(0x660)](_0x151c12[_0x5903cf(0x1a1)](0x3)),_0xf8c25d=_0x5903cf(0x4e8)[_0x5903cf(0x660)](_0x151c12);DataManager[_0x5903cf(0x1c8)](_0xf8c25d,_0x1f0581),setTimeout(this[_0x5903cf(0x66d)]['bind'](this,_0x151c12,_0xf8c25d),0x64);}},Scene_Boot['prototype'][_0x303df0(0x66d)]=function(_0x25ed79,_0xd70c7d){const _0x225dd0=_0x303df0;window[_0xd70c7d]?'SMkLC'==='SMkLC'?(VisuMZ[_0x225dd0(0x372)][_0x25ed79]=window[_0xd70c7d],window[_0xd70c7d]=undefined):_0xa154dc=this[_0x225dd0(0x27b)](_0x10e89b,_0x4cfdb5):setTimeout(this[_0x225dd0(0x66d)]['bind'](this,_0x25ed79,_0xd70c7d),0x64);},VisuMZ[_0x303df0(0x43f)]=[],VisuMZ['SelfSwitches']=[],VisuMZ[_0x303df0(0x4e6)]=[],VisuMZ[_0x303df0(0x597)]=[],VisuMZ[_0x303df0(0x17c)]=[],VisuMZ[_0x303df0(0x201)]=[],Scene_Boot[_0x303df0(0x2e5)][_0x303df0(0x687)]=function(){const _0x599673=_0x303df0;for(let _0x29dd6b=0x1;_0x29dd6b<$dataSystem[_0x599673(0x553)]['length'];_0x29dd6b++){if($dataSystem[_0x599673(0x553)][_0x29dd6b][_0x599673(0x5bf)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedSwitches']['push'](_0x29dd6b);if($dataSystem[_0x599673(0x553)][_0x29dd6b][_0x599673(0x5bf)](/<SELF>/i))VisuMZ[_0x599673(0x23a)][_0x599673(0x1bc)](_0x29dd6b);if($dataSystem['switches'][_0x29dd6b][_0x599673(0x5bf)](/<MAP>/i))VisuMZ[_0x599673(0x4e6)][_0x599673(0x1bc)](_0x29dd6b);}for(let _0x1e9e45=0x1;_0x1e9e45<$dataSystem[_0x599673(0x30a)][_0x599673(0x21b)];_0x1e9e45++){if($dataSystem['variables'][_0x1e9e45][_0x599673(0x5bf)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x599673(0x597)][_0x599673(0x1bc)](_0x1e9e45);if($dataSystem[_0x599673(0x30a)][_0x1e9e45]['match'](/<SELF>/i))VisuMZ['SelfVariables'][_0x599673(0x1bc)](_0x1e9e45);if($dataSystem['variables'][_0x1e9e45][_0x599673(0x5bf)](/<MAP>/i))VisuMZ[_0x599673(0x201)][_0x599673(0x1bc)](_0x1e9e45);}},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x4a8)]={},VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x303df0(0x1ff)]=function(){const _0x4a2525=_0x303df0;this[_0x4a2525(0x3cb)]=new Game_CPCInterpreter(),this[_0x4a2525(0x675)]();},VisuMZ['EventsMoveCore'][_0x303df0(0x4a8)][_0x303df0(0x675)]=function(){const _0x398bbc=_0x303df0;this[_0x398bbc(0x512)]=[];for(const _0x476401 of $dataCommonEvents){if(!_0x476401)continue;VisuMZ[_0x398bbc(0x28b)][_0x398bbc(0x4a8)][_0x398bbc(0x2e9)](_0x476401);if(_0x476401[_0x398bbc(0x29a)][_0x398bbc(0x21b)]>0x0)this[_0x398bbc(0x512)][_0x398bbc(0x1bc)](_0x476401['id']);}},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x4a8)]['metCPC']=function(_0x283ff9,_0x27591b){const _0x106253=_0x303df0;return this['_interpreter']['setup'](_0x283ff9,_0x27591b),this[_0x106253(0x3cb)]['execute'](),this[_0x106253(0x3cb)][_0x106253(0x430)];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x4a8)]['loadCPC']=function(_0x4a740d){const _0x4ddd96=_0x303df0;let _0x5ed088=![];_0x4a740d[_0x4ddd96(0x29a)]=[];for(const _0xaf2c00 of _0x4a740d[_0x4ddd96(0x341)]){if([0x6c,0x198][_0x4ddd96(0x37c)](_0xaf2c00[_0x4ddd96(0x20e)])){const _0x3c58b9=_0xaf2c00[_0x4ddd96(0x3c4)][0x0];if(_0x3c58b9['match'](/<PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x4ddd96(0x1f8)===_0x4ddd96(0x1f8))_0x5ed088=!![];else{if(this['_EventIcons']===_0x1ddcd7)this[_0x4ddd96(0x348)]();if(!_0x35e2d4)return null;if(_0x5eaeef===_0x312795)return this[_0x4ddd96(0x31b)][_0x4ddd96(0x468)];else{const _0x58325f=_0x100293[_0x4ddd96(0x28b)]['Settings'],_0x2a51be='Map%1-Event%2'[_0x4ddd96(0x660)](_0x3edee3['_mapId'],_0x47114e[_0x4ddd96(0x221)]);return this[_0x4ddd96(0x31b)][_0x2a51be]=this[_0x4ddd96(0x31b)][_0x2a51be]||{'iconIndex':0x0,'bufferX':_0x58325f['Icon'][_0x4ddd96(0x55d)],'bufferY':_0x58325f[_0x4ddd96(0x4a4)]['BufferY'],'blendMode':_0x58325f[_0x4ddd96(0x4a4)][_0x4ddd96(0x504)]},this[_0x4ddd96(0x31b)][_0x2a51be];}}}else _0x3c58b9['match'](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x5ed088=![]);}_0x5ed088&&(_0x4ddd96(0x379)!==_0x4ddd96(0x419)?_0x4a740d['CPC'][_0x4ddd96(0x1bc)](_0xaf2c00):_0x5a8f37[_0x4ddd96(0x680)](_0x359942,!!_0x27e9df));}},getSelfSwitchValue=function(_0x21182c,_0x22253e,_0x457d87){const _0x4439ac=_0x303df0;let _0x4e28c5=[_0x21182c,_0x22253e,'Self\x20Switch\x20%1'[_0x4439ac(0x660)](_0x457d87)];return typeof _0x457d87===_0x4439ac(0x5f9)&&(_0x4e28c5=[_0x21182c,_0x22253e,_0x457d87['toUpperCase']()[_0x4439ac(0x573)]()]),$gameSelfSwitches[_0x4439ac(0x5a6)](_0x4e28c5);},getMapSwitchValue=function(_0x10fb28,_0x46e832){const _0x55ce9f=_0x303df0;let _0x2bcfb8=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'['format'](_0x10fb28,_0x46e832)];return $gameSelfSwitches[_0x55ce9f(0x5a6)](_0x2bcfb8);},getMapVariableValue=function(_0xd5d568,_0x294060){const _0x1efc6b=_0x303df0;let _0x2cb281=[0x0,0x0,_0x1efc6b(0x3ee)[_0x1efc6b(0x660)](_0xd5d568,_0x294060)];return $gameSelfSwitches[_0x1efc6b(0x5a6)](_0x2cb281);},getSelfVariableValue=function(_0x94de38,_0x1cd3d1,_0x427677){const _0x19f587=_0x303df0,_0x1da5c3=[_0x94de38,_0x1cd3d1,_0x19f587(0x18a)[_0x19f587(0x660)](_0x427677)];return $gameSelfSwitches[_0x19f587(0x5a6)](_0x1da5c3);},setSelfSwitchValue=function(_0x5d04b7,_0x1f5a0f,_0x4ea0a3,_0x231b54){const _0x5059ec=_0x303df0;let _0x601dc7=[_0x5d04b7,_0x1f5a0f,'Self\x20Switch\x20%1'['format'](_0x4ea0a3)];typeof _0x4ea0a3===_0x5059ec(0x5f9)&&(_0x601dc7=[_0x5d04b7,_0x1f5a0f,_0x4ea0a3[_0x5059ec(0x4dc)]()[_0x5059ec(0x573)]()]),$gameSelfSwitches[_0x5059ec(0x680)](_0x601dc7,_0x231b54);},setSelfVariableValue=function(_0x20b894,_0x26af6e,_0x20a513,_0x2dbcf9){const _0x213043=_0x303df0,_0x4a49bb=[_0x20b894,_0x26af6e,_0x213043(0x18a)[_0x213043(0x660)](_0x20a513)];$gameSelfSwitches['setValue'](_0x4a49bb,_0x2dbcf9);},setMapSwitchValue=function(_0x7d59d1,_0xab20e4,_0x795095){const _0x37e0c3=_0x303df0;let _0x1cd76f=[0x0,0x0,_0x37e0c3(0x386)['format'](_0x7d59d1,_0xab20e4)];$gameSelfSwitches[_0x37e0c3(0x680)](_0x1cd76f,_0x795095);},setMapVariableValue=function(_0x45d62e,_0x158850,_0x124f65){const _0x1f214a=_0x303df0;let _0x5b868f=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x1f214a(0x660)](_0x45d62e,_0x158850)];$gameSelfSwitches[_0x1f214a(0x680)](_0x5b868f,_0x124f65);},DataManager[_0x303df0(0x1b5)]=function(_0xa33848){const _0x316eb9=_0x303df0;if(SceneManager[_0x316eb9(0x53a)][_0x316eb9(0x278)]===Scene_Debug)return![];return VisuMZ[_0x316eb9(0x43f)][_0x316eb9(0x37c)](_0xa33848);},DataManager['isAdvancedVariable']=function(_0x362290){const _0x506b78=_0x303df0;if(SceneManager[_0x506b78(0x53a)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x506b78(0x597)]['includes'](_0x362290);},DataManager[_0x303df0(0x5cb)]=function(_0x50a1f3){const _0x4916a8=_0x303df0;if(SceneManager[_0x4916a8(0x53a)][_0x4916a8(0x278)]===Scene_Debug)return![];return VisuMZ['SelfSwitches'][_0x4916a8(0x37c)](_0x50a1f3);},DataManager[_0x303df0(0x567)]=function(_0x557c98){const _0x171d7a=_0x303df0;if(SceneManager[_0x171d7a(0x53a)][_0x171d7a(0x278)]===Scene_Debug)return![];return VisuMZ[_0x171d7a(0x17c)][_0x171d7a(0x37c)](_0x557c98);},DataManager['isMapSwitch']=function(_0x427442){const _0x1e89ca=_0x303df0;if(BattleManager[_0x1e89ca(0x1af)]())return![];return VisuMZ[_0x1e89ca(0x4e6)][_0x1e89ca(0x37c)](_0x427442);},DataManager[_0x303df0(0x4af)]=function(_0x5e3f7e){const _0x7be219=_0x303df0;if(BattleManager[_0x7be219(0x1af)]())return![];return VisuMZ[_0x7be219(0x201)]['includes'](_0x5e3f7e);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x5f5)]=Game_Temp[_0x303df0(0x2e5)][_0x303df0(0x61d)],Game_Temp['prototype']['setDestination']=function(_0x4d2535,_0x2b32ca){const _0x327178=_0x303df0;if(this[_0x327178(0x464)](_0x4d2535,_0x2b32ca))return;VisuMZ[_0x327178(0x28b)]['Game_Temp_setDestination'][_0x327178(0x249)](this,_0x4d2535,_0x2b32ca);},Game_Temp[_0x303df0(0x2e5)][_0x303df0(0x464)]=function(_0x623d20,_0x50f1a1){const _0x6913d5=_0x303df0,_0x24e704=$gameMap[_0x6913d5(0x1cc)](_0x623d20,_0x50f1a1);for(const _0x39172f of _0x24e704){if(_0x39172f&&_0x39172f[_0x6913d5(0x54c)]()){if(_0x6913d5(0x2f5)===_0x6913d5(0x3c0))_0x27d19b=_0x1341b2['makeDeepCopy'](_0x4c3552),_0x58b1cf['EventsMoveCore'][_0x6913d5(0x1c5)][_0x6913d5(0x249)](this,_0x7a3f3f);else return _0x39172f[_0x6913d5(0x661)](),!![];}}return![];},Game_Temp[_0x303df0(0x2e5)][_0x303df0(0x349)]=function(_0x4d8d29){const _0x47c759=_0x303df0;this[_0x47c759(0x36c)]=_0x4d8d29;},Game_Temp[_0x303df0(0x2e5)][_0x303df0(0x2bb)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x303df0(0x2e5)][_0x303df0(0x627)]=function(_0x4c9352){const _0x417876=_0x303df0;this[_0x417876(0x5b9)]=_0x4c9352;},Game_Temp[_0x303df0(0x2e5)][_0x303df0(0x38e)]=function(){const _0x56d130=_0x303df0;this[_0x56d130(0x5b9)]=undefined;},Game_Temp[_0x303df0(0x2e5)][_0x303df0(0x47f)]=function(){const _0x5e23c2=_0x303df0;return this[_0x5e23c2(0x5b9)];},VisuMZ[_0x303df0(0x28b)]['Game_System_initialize']=Game_System[_0x303df0(0x2e5)][_0x303df0(0x1ff)],Game_System[_0x303df0(0x2e5)][_0x303df0(0x1ff)]=function(){const _0x4865dc=_0x303df0;VisuMZ[_0x4865dc(0x28b)][_0x4865dc(0x42d)][_0x4865dc(0x249)](this),this['initEventsMoveCore'](),this[_0x4865dc(0x3bc)]();},Game_System[_0x303df0(0x2e5)]['initEventsMoveCore']=function(){const _0x42fa9d=_0x303df0;this[_0x42fa9d(0x2b0)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x42fa9d(0x31b)]={},this[_0x42fa9d(0x392)]=[],this[_0x42fa9d(0x383)]={},this[_0x42fa9d(0x65f)]={},this[_0x42fa9d(0x2a6)]=![],this[_0x42fa9d(0x577)]=_0x42fa9d(0x3ff);},Game_System['prototype'][_0x303df0(0x575)]=function(){const _0x1568c3=_0x303df0;if(this[_0x1568c3(0x2b0)]===undefined)this[_0x1568c3(0x348)]();if(this[_0x1568c3(0x2b0)]['DashingEnable']===undefined)this[_0x1568c3(0x348)]();return this['_EventsMoveCoreSettings'][_0x1568c3(0x406)];},Game_System[_0x303df0(0x2e5)][_0x303df0(0x2b8)]=function(_0x5e7628){const _0x193cd2=_0x303df0;if(this[_0x193cd2(0x2b0)]===undefined)this['initEventsMoveCore']();if(this[_0x193cd2(0x2b0)][_0x193cd2(0x406)]===undefined)this[_0x193cd2(0x348)]();this['_EventsMoveCoreSettings']['DashingEnable']=_0x5e7628;},Game_System[_0x303df0(0x2e5)][_0x303df0(0x662)]=function(){const _0x419cf9=_0x303df0;if(this[_0x419cf9(0x2b0)]===undefined)this['initEventsMoveCore']();if(this[_0x419cf9(0x2b0)][_0x419cf9(0x291)]===undefined)this[_0x419cf9(0x348)]();return this['_EventsMoveCoreSettings']['EventAutoMovement'];},Game_System[_0x303df0(0x2e5)][_0x303df0(0x3aa)]=function(_0x75c17b){const _0x335d63=_0x303df0;if(this[_0x335d63(0x2b0)]===undefined)this[_0x335d63(0x348)]();if(this[_0x335d63(0x2b0)][_0x335d63(0x291)]===undefined)this[_0x335d63(0x348)]();this['_EventsMoveCoreSettings'][_0x335d63(0x291)]=_0x75c17b;},Game_System[_0x303df0(0x2e5)][_0x303df0(0x4da)]=function(){const _0x48f41b=_0x303df0;if(this[_0x48f41b(0x2b0)]===undefined)this[_0x48f41b(0x348)]();if(this[_0x48f41b(0x2b0)][_0x48f41b(0x1e4)]===undefined)this[_0x48f41b(0x348)]();return this[_0x48f41b(0x2b0)]['VisibleEventLabels'];},Game_System['prototype'][_0x303df0(0x32e)]=function(_0x3de61b){const _0x1c7ec7=_0x303df0;if(this[_0x1c7ec7(0x2b0)]===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings']['VisibleEventLabels']===undefined)this['initEventsMoveCore']();this[_0x1c7ec7(0x2b0)][_0x1c7ec7(0x1e4)]=_0x3de61b;},Game_System[_0x303df0(0x2e5)]['isPlayerControlDisabled']=function(){const _0x4dc54b=_0x303df0;return this[_0x4dc54b(0x2a6)]===undefined&&(_0x4dc54b(0x2cd)!==_0x4dc54b(0x2cd)?this[_0x4dc54b(0x4d5)]=_0x30c140[_0x4dc54b(0x37a)]:this[_0x4dc54b(0x2a6)]=![]),this[_0x4dc54b(0x2a6)];},Game_System['prototype']['setPlayerControlDisable']=function(_0x252c4e){const _0x48fccc=_0x303df0;this[_0x48fccc(0x2a6)]=_0x252c4e;},Game_System[_0x303df0(0x2e5)][_0x303df0(0x36b)]=function(){return this['_PlayerDiagonalSetting'];},Game_System[_0x303df0(0x2e5)][_0x303df0(0x682)]=function(_0x38153c){const _0x83dfc8=_0x303df0;this['_PlayerDiagonalSetting']=String(_0x38153c)[_0x83dfc8(0x3ba)]()['trim']();},Game_System[_0x303df0(0x2e5)][_0x303df0(0x34b)]=function(_0x180e6d){const _0x2342c3=_0x303df0;if(this[_0x2342c3(0x31b)]===undefined)this['initEventsMoveCore']();if(!_0x180e6d)return null;if(_0x180e6d===$gamePlayer)return this[_0x2342c3(0x31b)]['Player'];else{if(_0x2342c3(0x5b2)!==_0x2342c3(0x1b7)){const _0x2140a2=VisuMZ[_0x2342c3(0x28b)][_0x2342c3(0x578)],_0x2138fd='Map%1-Event%2'[_0x2342c3(0x660)](_0x180e6d['_mapId'],_0x180e6d[_0x2342c3(0x221)]);return this['_EventIcons'][_0x2138fd]=this['_EventIcons'][_0x2138fd]||{'iconIndex':0x0,'bufferX':_0x2140a2['Icon'][_0x2342c3(0x55d)],'bufferY':_0x2140a2[_0x2342c3(0x4a4)]['BufferY'],'blendMode':_0x2140a2['Icon'][_0x2342c3(0x504)]},this[_0x2342c3(0x31b)][_0x2138fd];}else{const _0x322427=_0x2342c3(0x17f)[_0x2342c3(0x660)](_0x389fa5,_0x3b6b0e);_0x441def[_0x322427]&&(_0x45622a[_0x322427]=_0x36378e[_0x322427]['slice'](0x0));}}},Game_System[_0x303df0(0x2e5)][_0x303df0(0x58b)]=function(_0x218e2c,_0x29ee0e,_0x380bf5,_0x120968,_0x378d06){const _0x2aeca1=_0x303df0;if(this[_0x2aeca1(0x31b)]===undefined)this[_0x2aeca1(0x348)]();const _0x424cb8=_0x218e2c===$gamePlayer?'Player':_0x2aeca1(0x67c)[_0x2aeca1(0x660)](_0x218e2c[_0x2aeca1(0x2b1)],_0x218e2c[_0x2aeca1(0x221)]);this[_0x2aeca1(0x31b)][_0x424cb8]={'iconIndex':_0x29ee0e,'bufferX':_0x380bf5,'bufferY':_0x120968,'blendMode':_0x378d06};},Game_System[_0x303df0(0x2e5)][_0x303df0(0x612)]=function(_0x249c7a,_0x1e572f,_0x234aee,_0x216547,_0x57b925,_0x3735be){const _0x1f0da8=_0x303df0;if(this[_0x1f0da8(0x31b)]===undefined)this[_0x1f0da8(0x348)]();const _0x3eb137=_0x1f0da8(0x67c)[_0x1f0da8(0x660)](_0x249c7a,_0x1e572f);this['_EventIcons'][_0x3eb137]={'iconIndex':_0x234aee,'bufferX':_0x216547,'bufferY':_0x57b925,'blendMode':_0x3735be};},Game_System[_0x303df0(0x2e5)][_0x303df0(0x52a)]=function(_0x49ffad){const _0x461151=_0x303df0;if(this[_0x461151(0x31b)]===undefined)this[_0x461151(0x348)]();if(!_0x49ffad)return null;if(_0x49ffad===$gamePlayer){if(_0x461151(0x248)===_0x461151(0x2eb))return this[_0x461151(0x635)](_0x1f0617(_0x2ea738['$1']));else delete this['_EventIcons'][_0x461151(0x468)];}else{if(_0x461151(0x648)===_0x461151(0x5ed)){if(_0x27b725)for(const _0x59affa of _0x112b5c[_0x461151(0x659)]()){_0x59affa[_0x461151(0x4ca)]();}}else this[_0x461151(0x281)](_0x49ffad[_0x461151(0x2b1)],_0x49ffad['_eventId']);}},Game_System['prototype']['deleteIconsOnEventsDataKey']=function(_0x106280,_0x13ea8b){const _0x36c3dc=_0x303df0;if(this['_EventIcons']===undefined)this[_0x36c3dc(0x348)]();const _0x22385a='Map%1-Event%2'[_0x36c3dc(0x660)](_0x106280,_0x13ea8b);delete this[_0x36c3dc(0x31b)][_0x22385a];},Game_System[_0x303df0(0x2e5)]['getSavedEventLocation']=function(_0x1330fa){const _0x11a1ce=_0x303df0;if(this[_0x11a1ce(0x65f)]===undefined)this[_0x11a1ce(0x348)]();if(!_0x1330fa)return null;const _0x139943=_0x11a1ce(0x67c)['format'](_0x1330fa[_0x11a1ce(0x2b1)],_0x1330fa['_eventId']);return this['_SavedEventLocations'][_0x139943];},Game_System[_0x303df0(0x2e5)]['saveEventLocation']=function(_0x7ce3cd){const _0x27a460=_0x303df0;if(this[_0x27a460(0x65f)]===undefined)this['initEventsMoveCore']();if(!_0x7ce3cd)return;const _0x4e3458=_0x27a460(0x67c)[_0x27a460(0x660)](_0x7ce3cd[_0x27a460(0x2b1)],_0x7ce3cd[_0x27a460(0x221)]);this[_0x27a460(0x65f)][_0x4e3458]={'direction':_0x7ce3cd[_0x27a460(0x5a9)](),'x':Math['round'](_0x7ce3cd['x']),'y':Math[_0x27a460(0x4eb)](_0x7ce3cd['y']),'pageIndex':_0x7ce3cd[_0x27a460(0x3a1)],'moveRouteIndex':_0x7ce3cd[_0x27a460(0x4d5)]};},Game_System[_0x303df0(0x2e5)][_0x303df0(0x261)]=function(_0x1374f8){const _0x4c24c=_0x303df0;if(this['_SavedEventLocations']===undefined)this[_0x4c24c(0x348)]();if(!_0x1374f8)return;this['deleteSavedEventLocationKey'](_0x1374f8[_0x4c24c(0x2b1)],_0x1374f8[_0x4c24c(0x221)]);},Game_System[_0x303df0(0x2e5)][_0x303df0(0x534)]=function(_0x14136f,_0x4affc4){const _0x464c0d=_0x303df0;if(this[_0x464c0d(0x65f)]===undefined)this['initEventsMoveCore']();const _0x49ef1a=_0x464c0d(0x67c)[_0x464c0d(0x660)](_0x14136f,_0x4affc4);delete this[_0x464c0d(0x65f)][_0x49ef1a];},Game_System['prototype']['createSaveEventLocationData']=function(_0x331bf0,_0x3f86cf,_0x5ad241,_0x3c9efe,_0x51618a,_0x1be27c,_0x1a8383){const _0x238a60=_0x303df0;if(this[_0x238a60(0x65f)]===undefined)this['initEventsMoveCore']();const _0x204003=_0x238a60(0x67c)[_0x238a60(0x660)](_0x331bf0,_0x3f86cf);this['_SavedEventLocations'][_0x204003]={'direction':_0x51618a,'x':Math['round'](_0x5ad241),'y':Math[_0x238a60(0x4eb)](_0x3c9efe),'pageIndex':_0x1be27c,'moveRouteIndex':_0x1a8383};},Game_System['prototype'][_0x303df0(0x5d2)]=function(_0x300110){const _0x22f0ae=_0x303df0;if(this[_0x22f0ae(0x383)]===undefined)this[_0x22f0ae(0x348)]();if(!_0x300110)return;const _0x1abaa5=_0x22f0ae(0x67c)[_0x22f0ae(0x660)](_0x300110[_0x22f0ae(0x2b1)],_0x300110['_eventId']);return this['_PreservedEventMorphData'][_0x1abaa5];},Game_System[_0x303df0(0x2e5)]['savePreservedMorphEventDataKey']=function(_0x11b3bb,_0x52c6e5,_0x33add0,_0x44b24f,_0x4cce56){const _0x224559=_0x303df0;if(this[_0x224559(0x383)]===undefined)this[_0x224559(0x348)]();const _0x4102d5=_0x224559(0x67c)['format'](_0x11b3bb,_0x52c6e5);this['_PreservedEventMorphData'][_0x4102d5]={'template':_0x33add0,'mapId':_0x44b24f,'eventId':_0x4cce56};},Game_System[_0x303df0(0x2e5)][_0x303df0(0x3a8)]=function(_0x36224e,_0x220008){const _0x3f86ff=_0x303df0;if(this['_PreservedEventMorphData']===undefined)this['initEventsMoveCore']();const _0x4bff84=_0x3f86ff(0x67c)[_0x3f86ff(0x660)](_0x36224e,_0x220008);delete this[_0x3f86ff(0x383)][_0x4bff84];},Game_System[_0x303df0(0x2e5)][_0x303df0(0x2e0)]=function(_0x144920){const _0x22a4e9=_0x303df0;if(this[_0x22a4e9(0x392)]===undefined)this['initEventsMoveCore']();return this[_0x22a4e9(0x392)][_0x144920]=this[_0x22a4e9(0x392)][_0x144920]||[],this[_0x22a4e9(0x392)][_0x144920];},Game_System[_0x303df0(0x2e5)]['removeTemporaryMapSpawnedEvents']=function(_0x56b585){const _0x2e7e4b=_0x303df0,_0x1826f9=this[_0x2e7e4b(0x2e0)](_0x56b585);for(const _0x9cef5e of _0x1826f9){if(_0x2e7e4b(0x22b)!==_0x2e7e4b(0x34d)){if(!_0x9cef5e)continue;if(_0x9cef5e[_0x2e7e4b(0x4ef)])continue;const _0x2841d4=_0x1826f9['indexOf'](_0x9cef5e);_0x1826f9[_0x2841d4]=null;}else[0x6c,0x198]['includes'](_0x452f9c[_0x2e7e4b(0x20e)])&&(_0x58bf0c+=_0x55ad35[_0x2e7e4b(0x3c4)][0x0]);}},Game_System[_0x303df0(0x2e5)][_0x303df0(0x3bc)]=function(){const _0x4ad8cc=_0x303df0;this[_0x4ad8cc(0x58e)]=0x0,this[_0x4ad8cc(0x26b)]=![];},Game_System[_0x303df0(0x2e5)][_0x303df0(0x344)]=function(){const _0x243c19=_0x303df0;if(this['_followerControlID']===undefined)this['initFollowerController']();return this[_0x243c19(0x58e)];},Game_System[_0x303df0(0x2e5)][_0x303df0(0x236)]=function(_0x9940e3){const _0x5b5157=_0x303df0;if(this[_0x5b5157(0x58e)]===undefined)this['initFollowerController']();this['_followerControlID']=_0x9940e3;;},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x322)]=Game_Interpreter[_0x303df0(0x2e5)][_0x303df0(0x497)],Game_Interpreter[_0x303df0(0x2e5)][_0x303df0(0x497)]=function(_0x27c2f2){const _0x58c658=_0x303df0;if(!$gameParty[_0x58c658(0x1a0)]()&&_0x27c2f2<0x0){let _0xb27eed=$gameSystem[_0x58c658(0x344)]();if(_0xb27eed>0x0)return $gamePlayer[_0x58c658(0x666)]()[_0x58c658(0x4e9)](_0xb27eed-0x1);}return VisuMZ[_0x58c658(0x28b)][_0x58c658(0x322)][_0x58c658(0x249)](this,_0x27c2f2);},Game_System[_0x303df0(0x2e5)]['isStopFollowerChasing']=function(){const _0x3045b3=_0x303df0;if(this[_0x3045b3(0x26b)]===undefined)this['initFollowerController']();return this[_0x3045b3(0x26b)];},Game_System[_0x303df0(0x2e5)][_0x303df0(0x431)]=function(_0x848b46){const _0x608ba8=_0x303df0;if(this[_0x608ba8(0x26b)]===undefined)this['initFollowerController']();this[_0x608ba8(0x26b)]=_0x848b46;;},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x4d2)]=Game_Timer[_0x303df0(0x2e5)][_0x303df0(0x1ff)],Game_Timer['prototype']['initialize']=function(){const _0x14819b=_0x303df0;VisuMZ['EventsMoveCore'][_0x14819b(0x4d2)]['call'](this),this[_0x14819b(0x348)]();},Game_Timer['prototype'][_0x303df0(0x348)]=function(){const _0x18d9d2=_0x303df0;this[_0x18d9d2(0x26a)]=![],this[_0x18d9d2(0x338)]=-0x1,this['_expireCommonEvent']=0x0;},Game_Timer[_0x303df0(0x2e5)][_0x303df0(0x3c1)]=function(_0x4e2f90){const _0x4b6ce9=_0x303df0;if(!_0x4e2f90)return;if(!this[_0x4b6ce9(0x4a0)])return;if(this[_0x4b6ce9(0x26a)])return;if(this[_0x4b6ce9(0x33c)]<=0x0)return;if(this[_0x4b6ce9(0x338)]===undefined)this[_0x4b6ce9(0x348)]();this[_0x4b6ce9(0x33c)]+=this['_speed'],this[_0x4b6ce9(0x33c)]<=0x0&&this[_0x4b6ce9(0x2a5)]();},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x33a)]=Game_Timer['prototype']['start'],Game_Timer['prototype'][_0x303df0(0x2ee)]=function(_0x3fc3d4){const _0x27d491=_0x303df0;VisuMZ[_0x27d491(0x28b)][_0x27d491(0x33a)][_0x27d491(0x249)](this,_0x3fc3d4);if(this[_0x27d491(0x26a)]===undefined)this[_0x27d491(0x348)]();this[_0x27d491(0x26a)]=![];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x25d)]=Game_Timer[_0x303df0(0x2e5)][_0x303df0(0x375)],Game_Timer[_0x303df0(0x2e5)][_0x303df0(0x375)]=function(){const _0x539495=_0x303df0;VisuMZ[_0x539495(0x28b)][_0x539495(0x25d)][_0x539495(0x249)](this);if(this['_paused']===undefined)this[_0x539495(0x348)]();this['_paused']=![];},Game_Timer['prototype'][_0x303df0(0x5b6)]=function(){const _0x2763c0=_0x303df0;if(this[_0x2763c0(0x33c)]<=0x0)return;this['_paused']=!![],this['_working']=!![];},Game_Timer['prototype'][_0x303df0(0x268)]=function(){if(this['_frames']<=0x0)return;this['_paused']=![],this['_working']=!![];},Game_Timer['prototype'][_0x303df0(0x287)]=function(_0x27e6ad){const _0x521570=_0x303df0;this[_0x521570(0x33c)]=this[_0x521570(0x33c)]||0x0,this['_frames']+=_0x27e6ad,this[_0x521570(0x4a0)]=!![],this[_0x521570(0x33c)]=Math['max'](0x1,this[_0x521570(0x33c)]);},Game_Timer['prototype'][_0x303df0(0x247)]=function(_0x32fd5e){const _0x4a55fc=_0x303df0;this[_0x4a55fc(0x33c)]=this[_0x4a55fc(0x33c)]||0x0,this['_frames']=_0x32fd5e,this['_working']=!![],this['_frames']=Math[_0x4a55fc(0x399)](0x1,this[_0x4a55fc(0x33c)]);},Game_Timer[_0x303df0(0x2e5)][_0x303df0(0x366)]=function(_0x41766e){const _0x4ab136=_0x303df0;this['_speed']=_0x41766e,this['_working']=!![];if(_0x41766e>0x0){if(_0x4ab136(0x50d)!==_0x4ab136(0x53e))this[_0x4ab136(0x33c)]=Math['max'](this[_0x4ab136(0x33c)],0x1);else{const _0x197bf7=_0x2e05fe?_0x3bea56['mapId']():0x0,_0x31a5ae=[0x0,0x0,_0x4ab136(0x386)['format'](_0x197bf7,_0x4962c2)];return _0x35e621[_0x4ab136(0x5a6)](_0x31a5ae);}}},Game_Timer['prototype'][_0x303df0(0x625)]=function(_0x152383){const _0x57886d=_0x303df0;if(this['_expireCommonEvent']===undefined)this[_0x57886d(0x348)]();this[_0x57886d(0x46f)]=_0x152383;},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x585)]=Game_Timer[_0x303df0(0x2e5)][_0x303df0(0x2a5)],Game_Timer[_0x303df0(0x2e5)][_0x303df0(0x2a5)]=function(){const _0x44506f=_0x303df0;if(this[_0x44506f(0x46f)]===undefined)this[_0x44506f(0x348)]();this[_0x44506f(0x46f)]?$gameTemp[_0x44506f(0x4c8)](this[_0x44506f(0x46f)]):_0x44506f(0x5d6)!==_0x44506f(0x5d6)?(this['_forceShowPlayer']=![],this['_forceHidePlayer']=!![]):VisuMZ[_0x44506f(0x28b)][_0x44506f(0x585)][_0x44506f(0x249)](this);},VisuMZ['EventsMoveCore'][_0x303df0(0x309)]=Game_Message['prototype'][_0x303df0(0x1c9)],Game_Message[_0x303df0(0x2e5)]['add']=function(_0x1d04f){const _0x461bb2=_0x303df0;VisuMZ['EventsMoveCore'][_0x461bb2(0x309)][_0x461bb2(0x249)](this,_0x1d04f),this['_selfEvent']=$gameTemp[_0x461bb2(0x47f)]();},Game_Message[_0x303df0(0x2e5)]['registerSelfEvent']=function(){const _0x119286=_0x303df0;$gameTemp[_0x119286(0x627)](this[_0x119286(0x242)]);},VisuMZ['EventsMoveCore'][_0x303df0(0x252)]=Game_Switches[_0x303df0(0x2e5)][_0x303df0(0x5a6)],Game_Switches[_0x303df0(0x2e5)][_0x303df0(0x5a6)]=function(_0x12f679){const _0x1077bb=_0x303df0;if(DataManager[_0x1077bb(0x1b5)](_0x12f679)){if('Hjqht'===_0x1077bb(0x4cc))return!!this['advancedValue'](_0x12f679);else this[_0x1077bb(0x1ca)]['scale']['x']=_0x5c93ed[_0x1077bb(0x59b)](0x1,this[_0x1077bb(0x1ca)][_0x1077bb(0x502)]['x']+0.1),this[_0x1077bb(0x1ca)]['scale']['y']=_0x4ba557['min'](0x1,this['_shadowSprite'][_0x1077bb(0x502)]['y']+0.1);}else{if(DataManager[_0x1077bb(0x5cb)](_0x12f679))return!!this[_0x1077bb(0x239)](_0x12f679);else return DataManager[_0x1077bb(0x1b3)](_0x12f679)?!!this['mapValue'](_0x12f679):VisuMZ[_0x1077bb(0x28b)][_0x1077bb(0x252)]['call'](this,_0x12f679);}},Game_Switches[_0x303df0(0x41f)]={},Game_Switches[_0x303df0(0x2e5)][_0x303df0(0x4ea)]=function(_0x4b3c68){const _0x10aa62=_0x303df0;if(!Game_Switches[_0x10aa62(0x41f)][_0x4b3c68]){if(_0x10aa62(0x560)===_0x10aa62(0x560)){$dataSystem[_0x10aa62(0x553)][_0x4b3c68][_0x10aa62(0x5bf)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x2b5fc6='return\x20%1'[_0x10aa62(0x660)](String(RegExp['$1']));Game_Switches[_0x10aa62(0x41f)][_0x4b3c68]=new Function(_0x10aa62(0x4f7),_0x2b5fc6);}else return _0x416bb5[_0x10aa62(0x28b)][_0x10aa62(0x252)][_0x10aa62(0x249)](this,_0x13baa4);}const _0x11a2ea=$gameTemp[_0x10aa62(0x47f)]()||this;return Game_Switches[_0x10aa62(0x41f)][_0x4b3c68]['call'](_0x11a2ea,_0x4b3c68);},Game_Switches['prototype']['selfValue']=function(_0x19edcc){const _0x1c3920=_0x303df0,_0x342d9a=$gameTemp[_0x1c3920(0x47f)]()||this;if(_0x342d9a[_0x1c3920(0x278)]!==Game_Event){if('MxEkR'!==_0x1c3920(0x41a))return VisuMZ[_0x1c3920(0x28b)][_0x1c3920(0x252)][_0x1c3920(0x249)](this,_0x19edcc);else{const _0x532fa9=this[_0x1c3920(0x4ac)]();return _0x532fa9?_0x532fa9[_0x1c3920(0x221)]:0x0;}}else{if(_0x1c3920(0x596)!=='Lspmu'){const _0x25d531=[_0x342d9a[_0x1c3920(0x2b1)],_0x342d9a[_0x1c3920(0x221)],_0x1c3920(0x48e)[_0x1c3920(0x660)](_0x19edcc)];return $gameSelfSwitches[_0x1c3920(0x5a6)](_0x25d531);}else{const _0x4c93e1=['','LOWER\x20LEFT',_0x1c3920(0x3de),_0x1c3920(0x589),_0x1c3920(0x35e),'','RIGHT','UPPER\x20LEFT','UP',_0x1c3920(0x5df)],_0x20420a=_0x4c93e1['indexOf'](_0x29bd90[_0x1c3920(0x4dc)]()[_0x1c3920(0x573)]());if(_0x20420a<=0x0)return;if(_0x5a92b0)_0x835e67['_moveAllowPlayerCollision']=!![];if(this[_0x1c3920(0x40f)](this['x'],this['y'],_0x20420a)){if(_0x21a188)_0x34fa8e['_moveAllowPlayerCollision']=![];this[_0x1c3920(0x653)](_0x20420a),this['_moveRouteIndex']-=0x1;}if(_0x2bdb1a)_0x1a19d4['_moveAllowPlayerCollision']=![];}}},Game_Switches[_0x303df0(0x2e5)][_0x303df0(0x4b8)]=function(_0x11a1eb){const _0x290bd2=_0x303df0,_0x59c59c=$gameMap?$gameMap[_0x290bd2(0x2c6)]():0x0,_0x2fd64b=[0x0,0x0,_0x290bd2(0x386)['format'](_0x59c59c,_0x11a1eb)];return $gameSelfSwitches[_0x290bd2(0x5a6)](_0x2fd64b);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x63c)]=Game_Switches[_0x303df0(0x2e5)][_0x303df0(0x680)],Game_Switches[_0x303df0(0x2e5)]['setValue']=function(_0x5b4fad,_0x9e5a57){const _0x45d42f=_0x303df0;if(DataManager['isSelfSwitch'](_0x5b4fad))_0x45d42f(0x5d1)!=='MEnYY'?(_0x2c6c3a[_0x45d42f(0x195)](),_0x297d77[_0x45d42f(0x28b)][_0x45d42f(0x193)][_0x45d42f(0x249)](this),_0x19c7a6[_0x45d42f(0x38e)]()):this[_0x45d42f(0x3e2)](_0x5b4fad,_0x9e5a57);else DataManager[_0x45d42f(0x1b3)](_0x5b4fad)?this[_0x45d42f(0x19c)](_0x5b4fad,_0x9e5a57):_0x45d42f(0x3b1)==='OTEbA'?VisuMZ['EventsMoveCore'][_0x45d42f(0x63c)][_0x45d42f(0x249)](this,_0x5b4fad,_0x9e5a57):(_0x949c31=_0x492783(_0x455124['$1']),_0x18b02a=_0xc176b1(_0x1250e1['$2']));},Game_Switches[_0x303df0(0x2e5)][_0x303df0(0x3e2)]=function(_0x5e1057,_0x52b6b8){const _0x1bed4f=_0x303df0,_0x3193e6=$gameTemp['getSelfTarget']()||this;if(_0x3193e6[_0x1bed4f(0x278)]!==Game_Event)VisuMZ['EventsMoveCore'][_0x1bed4f(0x63c)][_0x1bed4f(0x249)](this,_0x5e1057,_0x52b6b8);else{if(_0x1bed4f(0x4c0)!=='qrrbN')return _0x1f8d00;else{const _0x531f0d=[_0x3193e6[_0x1bed4f(0x2b1)],_0x3193e6[_0x1bed4f(0x221)],'Self\x20Switch\x20%1'[_0x1bed4f(0x660)](_0x5e1057)];$gameSelfSwitches[_0x1bed4f(0x680)](_0x531f0d,_0x52b6b8);}}},Game_Switches['prototype']['setMapValue']=function(_0x21b2ee,_0x27d776){const _0x268fb5=_0x303df0,_0x10d3da=$gameMap?$gameMap[_0x268fb5(0x2c6)]():0x0,_0x62e1d9=[0x0,0x0,_0x268fb5(0x386)[_0x268fb5(0x660)](_0x10d3da,_0x21b2ee)];return $gameSelfSwitches[_0x268fb5(0x680)](_0x62e1d9,_0x27d776);},VisuMZ['EventsMoveCore'][_0x303df0(0x2db)]=Game_Variables[_0x303df0(0x2e5)][_0x303df0(0x5a6)],Game_Variables['prototype'][_0x303df0(0x5a6)]=function(_0x1987cb){const _0x4663dd=_0x303df0;if(DataManager['isAdvancedVariable'](_0x1987cb))return this[_0x4663dd(0x4ea)](_0x1987cb);else{if(DataManager[_0x4663dd(0x567)](_0x1987cb))return this[_0x4663dd(0x239)](_0x1987cb);else{if(DataManager[_0x4663dd(0x4af)](_0x1987cb))return this[_0x4663dd(0x4b8)](_0x1987cb);else{if('xMGFv'!==_0x4663dd(0x259)){let _0xd501d4=_0x4663dd(0x481)['format'](_0x526ace[_0x4663dd(0x2c6)]);_0xd501d4+=_0x4663dd(0x310),_0xd501d4+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0xd501d4+=_0x4663dd(0x424),_0xd501d4+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'['format'](_0x5a4d68[_0x4663dd(0x2c6)]),_0xe6e4a7(_0xd501d4);return;}else return VisuMZ[_0x4663dd(0x28b)]['Game_Variables_value']['call'](this,_0x1987cb);}}}},Game_Variables[_0x303df0(0x41f)]={},Game_Variables[_0x303df0(0x2e5)][_0x303df0(0x4ea)]=function(_0x4c484e){const _0x54f0be=_0x303df0;if(!Game_Variables[_0x54f0be(0x41f)][_0x4c484e]){$dataSystem['variables'][_0x4c484e]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x238e4c='return\x20%1'[_0x54f0be(0x660)](String(RegExp['$1']));Game_Variables['advancedFunc'][_0x4c484e]=new Function(_0x54f0be(0x1e8),_0x238e4c);}const _0x24b497=$gameTemp[_0x54f0be(0x47f)]()||this;return Game_Variables['advancedFunc'][_0x4c484e]['call'](_0x24b497,_0x4c484e);},Game_Variables[_0x303df0(0x2e5)][_0x303df0(0x239)]=function(_0x2e546a){const _0xa5c413=_0x303df0,_0x5a0d99=$gameTemp[_0xa5c413(0x47f)]()||this;if(_0x5a0d99['constructor']!==Game_Event)return VisuMZ[_0xa5c413(0x28b)][_0xa5c413(0x2db)][_0xa5c413(0x249)](this,_0x2e546a);else{if(_0xa5c413(0x40a)!==_0xa5c413(0x1d5)){const _0x5100d2=[_0x5a0d99[_0xa5c413(0x2b1)],_0x5a0d99[_0xa5c413(0x221)],_0xa5c413(0x18a)[_0xa5c413(0x660)](_0x2e546a)];return $gameSelfSwitches[_0xa5c413(0x5a6)](_0x5100d2);}else _0x213046=![];}},Game_Variables[_0x303df0(0x2e5)][_0x303df0(0x4b8)]=function(_0x113979){const _0x526270=_0x303df0,_0x3d4ca0=$gameMap?$gameMap['mapId']():0x0,_0x1e2bd9=[0x0,0x0,_0x526270(0x3ee)[_0x526270(0x660)](_0x3d4ca0,_0x113979)];return $gameSelfSwitches['value'](_0x1e2bd9)||0x0;},VisuMZ['EventsMoveCore']['Game_Variables_setValue']=Game_Variables['prototype'][_0x303df0(0x680)],Game_Variables[_0x303df0(0x2e5)][_0x303df0(0x680)]=function(_0x14991c,_0x2c1b62){const _0xed983d=_0x303df0;if(DataManager[_0xed983d(0x567)](_0x14991c)){if('RdEQB'===_0xed983d(0x649))this['setSelfValue'](_0x14991c,_0x2c1b62);else{const _0x1a5ad4=this[_0xed983d(0x5e3)][_0xed983d(0x542)]();this[_0xed983d(0x5e3)][_0xed983d(0x568)](this['_text'],_0x1a5ad4,0x0);}}else DataManager[_0xed983d(0x4af)](_0x14991c)?_0xed983d(0x603)===_0xed983d(0x4ba)?(this['updatePeriodicRefresh'](),_0xf0efed[_0xed983d(0x28b)]['Game_Map_update'][_0xed983d(0x249)](this,_0xe78919)):this[_0xed983d(0x19c)](_0x14991c,_0x2c1b62):VisuMZ[_0xed983d(0x28b)][_0xed983d(0x67e)]['call'](this,_0x14991c,_0x2c1b62);},Game_Variables[_0x303df0(0x2e5)][_0x303df0(0x3e2)]=function(_0x41b827,_0xd2d974){const _0x2147ce=_0x303df0,_0x1d9f1a=$gameTemp['getSelfTarget']()||this;if(_0x1d9f1a[_0x2147ce(0x278)]!==Game_Event)VisuMZ[_0x2147ce(0x28b)][_0x2147ce(0x67e)][_0x2147ce(0x249)](this,_0x41b827,_0xd2d974);else{const _0x4e7f3b=[_0x1d9f1a[_0x2147ce(0x2b1)],_0x1d9f1a[_0x2147ce(0x221)],'Self\x20Variable\x20%1'['format'](_0x41b827)];$gameSelfSwitches[_0x2147ce(0x680)](_0x4e7f3b,_0xd2d974);}},Game_Variables['prototype'][_0x303df0(0x19c)]=function(_0x442fee,_0x539efc){const _0x2fc96a=_0x303df0,_0x52bdd9=$gameMap?$gameMap[_0x2fc96a(0x2c6)]():0x0,_0x3f30b6=[0x0,0x0,_0x2fc96a(0x3ee)[_0x2fc96a(0x660)](_0x52bdd9,_0x442fee)];$gameSelfSwitches[_0x2fc96a(0x680)](_0x3f30b6,_0x539efc);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x256)]=Game_SelfSwitches[_0x303df0(0x2e5)][_0x303df0(0x5a6)],Game_SelfSwitches[_0x303df0(0x2e5)][_0x303df0(0x5a6)]=function(_0x9af578){const _0x2f8a16=_0x303df0;if(_0x9af578[0x2]['match'](/(?:SELF|MAP)/i)){if(_0x2f8a16(0x17e)!==_0x2f8a16(0x1e2))return this[_0x2f8a16(0x239)](_0x9af578);else{const _0x351713=_0x23e045[_0x2f8a16(0x5db)](_0x46fb0c(_0x3f25b3['$1']));return this[_0x2f8a16(0x487)](_0x351713);}}else{if(_0x2f8a16(0x63d)!=='nazlG'){return VisuMZ[_0x2f8a16(0x28b)][_0x2f8a16(0x256)][_0x2f8a16(0x249)](this,_0x9af578);;}else _0xfa1cca[_0x2f8a16(0x28b)]['Spriteset_Map_createShadow'][_0x2f8a16(0x249)](this),this[_0x2f8a16(0x422)]();}},Game_SelfSwitches[_0x303df0(0x2e5)]['selfValue']=function(_0x15eb4d){const _0x2e9c5b=_0x303df0;return _0x15eb4d[0x2]['match'](/VAR/i)?this[_0x2e9c5b(0x4e3)][_0x15eb4d]||0x0:!!this[_0x2e9c5b(0x4e3)][_0x15eb4d];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x1cd)]=Game_SelfSwitches[_0x303df0(0x2e5)][_0x303df0(0x680)],Game_SelfSwitches[_0x303df0(0x2e5)]['setValue']=function(_0x1c721d,_0x4cc8be){const _0x4fe1be=_0x303df0;if(_0x1c721d[0x2]['match'](/(?:SELF|MAP)/i))_0x4fe1be(0x1b4)!==_0x4fe1be(0x45d)?this[_0x4fe1be(0x3e2)](_0x1c721d,_0x4cc8be):this[_0x4fe1be(0x3af)](_0x56246a);else{if(_0x4fe1be(0x1c1)!==_0x4fe1be(0x1c1)){this[_0x4fe1be(0x43c)](),this[_0x4fe1be(0x2c3)][_0x4fe1be(0x545)]();const _0x1ecac7=this[_0x4fe1be(0x3e9)][_0x4fe1be(0x646)](/[\r\n]+/);let _0x209117=0x0;for(const _0x10aa92 of _0x1ecac7){const _0x384582=this[_0x4fe1be(0x1c3)](_0x10aa92),_0x1ce8ea=_0x4d75e0[_0x4fe1be(0x39c)]((this[_0x4fe1be(0x3f9)]-_0x384582[_0x4fe1be(0x2f2)])/0x2);this['drawTextEx'](_0x10aa92,_0x1ce8ea,_0x209117),_0x209117+=_0x384582['height'];}}else VisuMZ['EventsMoveCore'][_0x4fe1be(0x1cd)][_0x4fe1be(0x249)](this,_0x1c721d,_0x4cc8be);}},Game_SelfSwitches[_0x303df0(0x2e5)]['setSelfValue']=function(_0x208863,_0x116713){const _0x2aa1cc=_0x303df0;this[_0x2aa1cc(0x4e3)][_0x208863]=_0x208863[0x2][_0x2aa1cc(0x5bf)](/VAR/i)?_0x116713:!!_0x116713,this['onChange']();},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x2fe)]=Game_Enemy[_0x303df0(0x2e5)][_0x303df0(0x3e5)],Game_Enemy[_0x303df0(0x2e5)][_0x303df0(0x3e5)]=function(_0x4aee0c){const _0x380b6a=_0x303df0;$gameTemp[_0x380b6a(0x627)](this);const _0x4ee4d1=VisuMZ[_0x380b6a(0x28b)][_0x380b6a(0x2fe)][_0x380b6a(0x249)](this,_0x4aee0c);return $gameTemp[_0x380b6a(0x38e)](),_0x4ee4d1;},VisuMZ[_0x303df0(0x28b)]['Game_Troop_meetsConditions']=Game_Troop[_0x303df0(0x2e5)][_0x303df0(0x44b)],Game_Troop[_0x303df0(0x2e5)][_0x303df0(0x44b)]=function(_0x4597c3){const _0x1e16f3=_0x303df0;$gameTemp[_0x1e16f3(0x627)](this);const _0x2af6d2=VisuMZ[_0x1e16f3(0x28b)][_0x1e16f3(0x4c4)][_0x1e16f3(0x249)](this,_0x4597c3);return $gameTemp[_0x1e16f3(0x38e)](),_0x2af6d2;},VisuMZ['EventsMoveCore'][_0x303df0(0x584)]=Game_Map[_0x303df0(0x2e5)][_0x303df0(0x194)],Game_Map['prototype'][_0x303df0(0x194)]=function(_0x48b1e7){const _0x45aec0=_0x303df0;this[_0x45aec0(0x514)](_0x48b1e7),this[_0x45aec0(0x629)](),VisuMZ[_0x45aec0(0x28b)][_0x45aec0(0x584)][_0x45aec0(0x249)](this,_0x48b1e7),this[_0x45aec0(0x629)](),this[_0x45aec0(0x1c7)](),this['setupRegionRestrictions'](),this[_0x45aec0(0x4d3)](),this['setupSpawnedEvents'](),this[_0x45aec0(0x273)](),this[_0x45aec0(0x62f)](),this[_0x45aec0(0x629)]();},VisuMZ['EventsMoveCore'][_0x303df0(0x65d)]=Game_Map[_0x303df0(0x2e5)]['setupEvents'],Game_Map[_0x303df0(0x2e5)]['setupEvents']=function(){const _0x3d328b=_0x303df0;VisuMZ['EventsMoveCore'][_0x3d328b(0x65d)]['call'](this),this['refreshIfNeeded']();},Game_Map[_0x303df0(0x2bf)]=0xc8,Game_Map[_0x303df0(0x2e5)][_0x303df0(0x688)]=function(){const _0x5b9403=_0x303df0,_0x96f88=Game_Map[_0x5b9403(0x2bf)];this[_0x5b9403(0x4fc)]=this[_0x5b9403(0x659)]()[_0x5b9403(0x21b)]>_0x96f88;if(this[_0x5b9403(0x4fc)]&&$gameTemp[_0x5b9403(0x42e)]()){}},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x18e)]=function(){const _0x3aefd0=_0x303df0;return this[_0x3aefd0(0x4fc)];},Game_Map[_0x303df0(0x2e5)]['clearEventCache']=function(){this['_eventCache']=undefined;},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x1c7)]=function(){const _0x17981b=_0x303df0;this[_0x17981b(0x630)]=VisuMZ[_0x17981b(0x28b)][_0x17981b(0x578)][_0x17981b(0x3bf)]['EnableDir8'];const _0x388582=$dataMap[_0x17981b(0x5bd)]||'';if(_0x388582['match'](/<DIAGONAL MOVEMENT: ON>/i))this[_0x17981b(0x630)]=!![];else _0x388582['match'](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x17981b(0x630)]=![]);},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x3e3)]=function(){const _0x498dd1=_0x303df0,_0x4f3a1d=$gameSystem[_0x498dd1(0x36b)]();if(_0x4f3a1d==='enable')return!![];if(_0x4f3a1d===_0x498dd1(0x664))return![];if(this[_0x498dd1(0x630)]===undefined)this[_0x498dd1(0x1c7)]();return this['_diagonalSupport'];},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x1c6)]=function(_0x2caeb1,_0x1c5d5e){const _0x8acb98=_0x303df0;if([0x1,0x4,0x7][_0x8acb98(0x37c)](_0x1c5d5e))_0x2caeb1-=0x1;if([0x3,0x6,0x9][_0x8acb98(0x37c)](_0x1c5d5e))_0x2caeb1+=0x1;return this[_0x8acb98(0x5d3)](_0x2caeb1);},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x5ca)]=function(_0x27f40c,_0x3ebfd3){const _0x103b80=_0x303df0;if([0x1,0x2,0x3][_0x103b80(0x37c)](_0x3ebfd3))_0x27f40c+=0x1;if([0x7,0x8,0x9]['includes'](_0x3ebfd3))_0x27f40c-=0x1;return this[_0x103b80(0x3e0)](_0x27f40c);},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x65a)]=function(_0x5c6df6,_0xfb30e9,_0x23605b,_0x221817){const _0x3f00c5=_0x303df0;return Math[_0x3f00c5(0x399)](Math[_0x3f00c5(0x3f0)](this['deltaX'](_0x5c6df6,_0x23605b)),Math[_0x3f00c5(0x3f0)](this[_0x3f00c5(0x1f3)](_0xfb30e9,_0x221817)));},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x471)]=function(){const _0x1057c0=_0x303df0,_0x19946c=VisuMZ['EventsMoveCore'][_0x1057c0(0x578)][_0x1057c0(0x418)],_0x203478={},_0x5a523f=[_0x1057c0(0x657),_0x1057c0(0x529),_0x1057c0(0x4f2)],_0x87b846=[_0x1057c0(0x218),_0x1057c0(0x4f4),_0x1057c0(0x468),_0x1057c0(0x23c),'Vehicle',_0x1057c0(0x452),_0x1057c0(0x3ef),'Airship'];for(const _0x2b4f0d of _0x5a523f){if('CfWOQ'===_0x1057c0(0x581)){if([0x6c,0x198][_0x1057c0(0x37c)](_0xa93bdc[_0x1057c0(0x20e)])){if(_0x594580!=='')_0x5848c8+='\x0a';_0x2eaa24+=_0x4ba7f8[_0x1057c0(0x3c4)][0x0];}}else for(const _0x7da411 of _0x87b846){if(_0x1057c0(0x3b6)!=='VvZXq'){const _0x33fb22=_0x5939af[_0x1057c0(0x302)](this);_0x33fb22&&_0x33fb22['_shadowSprite']&&_0x33fb22['_shadowSprite'][_0x1057c0(0x350)]!==this[_0x1057c0(0x251)]()&&(_0x33fb22[_0x1057c0(0x1ca)][_0x1057c0(0x350)]=this['shadowFilename'](),_0x33fb22[_0x1057c0(0x1ca)]['bitmap']=_0x18c8a6[_0x1057c0(0x57b)](_0x33fb22[_0x1057c0(0x1ca)][_0x1057c0(0x350)]));}else{const _0x211f40='%1%2'[_0x1057c0(0x660)](_0x7da411,_0x2b4f0d);_0x19946c[_0x211f40]&&(_0x203478[_0x211f40]=_0x19946c[_0x211f40]['slice'](0x0));}}}const _0x50b8e5=$dataMap[_0x1057c0(0x5bd)]||'',_0x1cbc16=_0x50b8e5[_0x1057c0(0x5bf)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x1cbc16){if(_0x1057c0(0x447)==='OhqOe')this['_forceDashing']=!![];else for(const _0x32e264 of _0x1cbc16){_0x32e264[_0x1057c0(0x5bf)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x2a84d8=String(RegExp['$1'])[_0x1057c0(0x3ba)]()[_0x1057c0(0x573)](),_0x2e10a6=String(RegExp['$2'])[_0x1057c0(0x3ba)]()[_0x1057c0(0x573)]();const _0x9fc90b=JSON[_0x1057c0(0x533)]('['+RegExp['$3'][_0x1057c0(0x5bf)](/\d+/g)+']');_0x2a84d8=_0x2a84d8[_0x1057c0(0x58d)](0x0)['toUpperCase']()+_0x2a84d8['slice'](0x1),_0x2e10a6=_0x2e10a6['charAt'](0x0)[_0x1057c0(0x4dc)]()+_0x2e10a6[_0x1057c0(0x355)](0x1);const _0x18ae12=_0x1057c0(0x17f)[_0x1057c0(0x660)](_0x2a84d8,_0x2e10a6);if(_0x203478[_0x18ae12])_0x203478[_0x18ae12]=_0x203478[_0x18ae12][_0x1057c0(0x5ae)](_0x9fc90b);}}this['_regionRules']=_0x203478;},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x50a)]=function(_0x68cbab,_0x3fc3d9,_0x18e7ab,_0x126999){const _0x3e2036=_0x303df0,_0x1791c8=this[_0x3e2036(0x1c6)](_0x68cbab,_0x18e7ab),_0x3be5d3=this[_0x3e2036(0x5ca)](_0x3fc3d9,_0x18e7ab),_0x60aa49=this[_0x3e2036(0x389)](_0x1791c8,_0x3be5d3),_0x1cd998=this[_0x3e2036(0x1c2)];if(_0x1cd998['AllAllow'][_0x3e2036(0x37c)](_0x60aa49))return _0x3e2036(0x32d)===_0x3e2036(0x2ac)?this[_0x3e2036(0x187)](0x6,_0x98d4a(_0x33d6c6['$1'])):!![];else{if(_0x126999===_0x3e2036(0x1dc)){if(_0x3e2036(0x3f8)==='pQOHF')return _0x1cd998[_0x3e2036(0x330)][_0x3e2036(0x37c)](_0x60aa49)||_0x1cd998[_0x3e2036(0x208)][_0x3e2036(0x37c)](_0x60aa49);else _0x2207c3(_0x3e2036(0x285)['format'](_0x153ddf,_0x2c99fd,_0x1d176c)),_0xbf6b40[_0x3e2036(0x358)]();}else{if(_0x126999===_0x3e2036(0x5db))return _0x1cd998[_0x3e2036(0x600)][_0x3e2036(0x37c)](_0x60aa49)||_0x1cd998['WalkAllow'][_0x3e2036(0x37c)](_0x60aa49);else{if(_0x1cd998[_0x3e2036(0x35a)][_0x3e2036(0x37c)](_0x60aa49))return _0x3e2036(0x17b)!==_0x3e2036(0x17b)?(this['_pose']||'')[_0x3e2036(0x4dc)]()[_0x3e2036(0x573)]():!![];else{const _0x4a2e48=_0x3e2036(0x5c8)[_0x3e2036(0x660)](_0x126999[_0x3e2036(0x58d)](0x0)[_0x3e2036(0x4dc)]()+_0x126999['slice'](0x1));if(_0x1cd998[_0x4a2e48])return _0x1cd998[_0x4a2e48]['includes'](_0x60aa49);}}}}return![];},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x61b)]=function(_0x24deb7,_0x287e3c,_0x507b72,_0x122319){const _0x13a1a9=_0x303df0,_0x380a4b=this[_0x13a1a9(0x1c6)](_0x24deb7,_0x507b72),_0xa83fc7=this[_0x13a1a9(0x5ca)](_0x287e3c,_0x507b72),_0x49ad06=this[_0x13a1a9(0x389)](_0x380a4b,_0xa83fc7),_0x2a2258=this[_0x13a1a9(0x1c2)];if(_0x2a2258[_0x13a1a9(0x2b2)][_0x13a1a9(0x37c)](_0x49ad06))return!![];else{if(_0x122319===_0x13a1a9(0x1dc))return _0x2a2258[_0x13a1a9(0x4d8)][_0x13a1a9(0x37c)](_0x49ad06)||_0x2a2258['WalkForbid'][_0x13a1a9(0x37c)](_0x49ad06);else{if(_0x122319==='event')return _0x2a2258['EventForbid'][_0x13a1a9(0x37c)](_0x49ad06)||_0x2a2258['WalkForbid'][_0x13a1a9(0x37c)](_0x49ad06);else{if(_0x2a2258['VehicleForbid'][_0x13a1a9(0x37c)](_0x49ad06))return!![];else{if('TzsQh'!==_0x13a1a9(0x1d2)){if(!this['_needsPeriodicRefresh'])return;this[_0x13a1a9(0x634)]=this[_0x13a1a9(0x634)]||0x3c,this[_0x13a1a9(0x634)]--,this[_0x13a1a9(0x634)]<=0x0&&(this['requestRefresh'](),this[_0x13a1a9(0x634)]=0x3c);}else{const _0x506c3e=_0x13a1a9(0x1a6)[_0x13a1a9(0x660)](_0x122319[_0x13a1a9(0x58d)](0x0)[_0x13a1a9(0x4dc)]()+_0x122319[_0x13a1a9(0x355)](0x1));if(_0x2a2258[_0x506c3e])return _0x2a2258[_0x506c3e][_0x13a1a9(0x37c)](_0x49ad06);}}}}}return![];},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x36a)]=function(_0x31c10b,_0x45c4c8,_0x2f0c23,_0x169442){const _0x9d7316=_0x303df0;_0x2f0c23=_0x169442===_0x9d7316(0x36d)?0x5:_0x2f0c23;const _0x3a76fa=this[_0x9d7316(0x1c6)](_0x31c10b,_0x2f0c23),_0x125cf6=this['roundYWithDirection'](_0x45c4c8,_0x2f0c23),_0x2ac4c7=this[_0x9d7316(0x389)](_0x3a76fa,_0x125cf6),_0x4a9d29=this[_0x9d7316(0x1c2)];if(_0x4a9d29[_0x9d7316(0x3b5)][_0x9d7316(0x37c)](_0x2ac4c7)){if(_0x9d7316(0x3f4)==='hvVVk')return!![];else this['_moveSynch'][_0x9d7316(0x5f4)]=0x0;}else{if('CQygt'===_0x9d7316(0x583)){const _0x38ebd6=_0x9d7316(0x3d6)[_0x9d7316(0x660)](_0x169442[_0x9d7316(0x58d)](0x0)[_0x9d7316(0x4dc)]()+_0x169442[_0x9d7316(0x355)](0x1));if(_0x4a9d29[_0x38ebd6])return _0x4a9d29[_0x38ebd6][_0x9d7316(0x37c)](_0x2ac4c7);}else _0x2fc612[_0x9d7316(0x207)]();}return![];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x556)]=Game_Map['prototype']['refresh'],Game_Map['prototype'][_0x303df0(0x4ca)]=function(){const _0x4ee756=_0x303df0;VisuMZ[_0x4ee756(0x28b)][_0x4ee756(0x556)][_0x4ee756(0x249)](this),this['checkNeedForPeriodicRefresh']();},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x1c0)]=function(){const _0x47909f=_0x303df0;this[_0x47909f(0x29f)]=![];if(this['events']()[_0x47909f(0x66c)](_0x846999=>_0x846999[_0x47909f(0x4c1)]())){this[_0x47909f(0x29f)]=!![];return;}if(this['events']()['some'](_0xb32a1d=>_0xb32a1d[_0x47909f(0x3d3)]())){if(_0x47909f(0x5aa)!==_0x47909f(0x5aa)){const _0x3b01f2=this[_0x47909f(0x4fd)],_0x4dde20=this['_randomHomeY'];return this[_0x47909f(0x48b)](_0x3b01f2,_0x4dde20);}else{this[_0x47909f(0x29f)]=!![];return;}}if(this[_0x47909f(0x512)][_0x47909f(0x66c)](_0x59b349=>_0x59b349['hasAdvancedSwitchVariable']())){if(_0x47909f(0x620)===_0x47909f(0x3f3))_0x30ad72['ConvertParams'](_0x2bb3ba,_0x1107c3),_0x2bdfa5[_0x47909f(0x58b)](_0xc1fadb,_0x204d07['IconIndex'],_0x1af466[_0x47909f(0x490)],_0x31d723[_0x47909f(0x416)],_0x5154b5[_0x47909f(0x5b7)]);else{this[_0x47909f(0x29f)]=!![];return;}}if(this[_0x47909f(0x512)][_0x47909f(0x66c)](_0x4585ac=>_0x4585ac['hasCPCs']())){if(_0x47909f(0x304)===_0x47909f(0x2ba))this[_0x47909f(0x62f)]();else{this[_0x47909f(0x29f)]=!![];return;}}},VisuMZ['EventsMoveCore'][_0x303df0(0x40b)]=Game_Map['prototype'][_0x303df0(0x3c1)],Game_Map[_0x303df0(0x2e5)][_0x303df0(0x3c1)]=function(_0x48e5d8){const _0x1c5dc3=_0x303df0;this['updatePeriodicRefresh'](),VisuMZ[_0x1c5dc3(0x28b)][_0x1c5dc3(0x40b)]['call'](this,_0x48e5d8);},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x1a7)]=function(){const _0x42bc13=_0x303df0;if(!this[_0x42bc13(0x29f)])return;this[_0x42bc13(0x634)]=this['_periodicRefreshTimer']||0x3c,this[_0x42bc13(0x634)]--;if(this[_0x42bc13(0x634)]<=0x0){if('AygXG'==='BvNSq'){const _0x5beb98=this[_0x42bc13(0x5a9)]();return _0x332c22['roundXWithDirection'](this['x'],_0x5beb98);}else this[_0x42bc13(0x66b)](),this[_0x42bc13(0x634)]=0x3c;}},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x279)]=Game_Map[_0x303df0(0x2e5)][_0x303df0(0x19b)],Game_Map[_0x303df0(0x2e5)][_0x303df0(0x19b)]=function(){const _0xd43457=_0x303df0;if(!$gameSystem['isDashingEnabled']())return!![];return VisuMZ[_0xd43457(0x28b)][_0xd43457(0x279)][_0xd43457(0x249)](this);},Game_Map['prototype'][_0x303df0(0x4d3)]=function(){const _0x44ff54=_0x303df0;this[_0x44ff54(0x2b6)]=![];const _0xb17256=$dataMap[_0x44ff54(0x5bd)]||'';_0xb17256[_0x44ff54(0x5bf)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x44ff54(0x2b6)]=!![]);},Game_Map[_0x303df0(0x2e5)]['isSaveEventLocations']=function(){const _0x51720d=_0x303df0;if(this[_0x51720d(0x2b6)]===undefined)this[_0x51720d(0x4d3)]();return this[_0x51720d(0x2b6)];},Game_Map[_0x303df0(0x2e5)]['removeTemporaryMapSpawnedEvents']=function(_0x21f59e){const _0x4797e4=_0x303df0;_0x21f59e!==this[_0x4797e4(0x2c6)]()&&$gamePlayer&&$gameSystem[_0x4797e4(0x514)](this[_0x4797e4(0x2c6)]());},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x443)]=function(){const _0x398a14=_0x303df0;this['_spawnedEvents']=$gameSystem[_0x398a14(0x2e0)](this[_0x398a14(0x2c6)]()),this[_0x398a14(0x391)]=!![];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x1ad)]=Game_Map[_0x303df0(0x2e5)]['events'],Game_Map['prototype'][_0x303df0(0x659)]=function(){const _0x4595ca=_0x303df0;if(this[_0x4595ca(0x297)])return this[_0x4595ca(0x297)];const _0x4d6a12=VisuMZ['EventsMoveCore'][_0x4595ca(0x1ad)][_0x4595ca(0x249)](this),_0x404770=_0x4d6a12[_0x4595ca(0x5ae)](this[_0x4595ca(0x4ab)]||[]);return this[_0x4595ca(0x297)]=_0x404770['filter'](_0x4e50cf=>!!_0x4e50cf),this[_0x4595ca(0x297)];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x557)]=Game_Map[_0x303df0(0x2e5)]['event'],Game_Map['prototype'][_0x303df0(0x5db)]=function(_0x518932){const _0x4b9f41=_0x303df0;if(_0x518932>=0x3e8)return _0x518932-=0x3e8,this[_0x4b9f41(0x4ab)][_0x518932];else{if(_0x4b9f41(0x31c)!==_0x4b9f41(0x31c)){if(_0x50486d['isBigCharacter'](this[_0x4b9f41(0x527)]))return;_0x70ba65=_0x18d6f4[_0x4b9f41(0x505)](0x0,0x7),this[_0x4b9f41(0x231)](this[_0x4b9f41(0x527)],_0xcb8d3e);}else return VisuMZ[_0x4b9f41(0x28b)][_0x4b9f41(0x557)][_0x4b9f41(0x249)](this,_0x518932);}},Game_Map['prototype']['eraseEvent']=function(_0x191ea5){const _0x3afc5b=_0x303df0,_0x1c342f=this['event'](_0x191ea5);if(_0x1c342f)_0x1c342f[_0x3afc5b(0x467)]();},Game_Map[_0x303df0(0x2e5)]['setupSpawnTest']=function(){const _0x5d5e4d=_0x303df0,_0x5dc891={'template':'Button','mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x5d5e4d(0x4ab)][_0x5d5e4d(0x21b)]+0x3e8};this['createSpawnedEventWithData'](_0x5dc891);},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x606)]=function(_0x1f297c,_0x2beffe){const _0x159cf6=_0x303df0;if(this[_0x159cf6(0x1cc)](_0x1f297c,_0x2beffe)[_0x159cf6(0x21b)]>0x0)return!![];if($gamePlayer['x']===_0x1f297c&&$gamePlayer['y']===_0x2beffe)return!![];if(this[_0x159cf6(0x232)]()[_0x159cf6(0x18b)](_0x1f297c,_0x2beffe))return!![];if(this['ship']()['posNt'](_0x1f297c,_0x2beffe))return!![];return![];},Game_Map[_0x303df0(0x2e5)]['isSpawnHitboxCollisionOk']=function(_0x172e5c,_0x1c613d,_0x1a821e){const _0x538e69=_0x303df0;$gameTemp['_spawnData']=_0x172e5c;const _0x15c7d0=new Game_Event(_0x172e5c[_0x538e69(0x2c6)],_0x172e5c['eventId']);$gameTemp[_0x538e69(0x1b9)]=undefined,_0x15c7d0[_0x538e69(0x4ca)]();let _0x1f41a3=_0x1c613d-_0x15c7d0[_0x538e69(0x4e1)][_0x538e69(0x42a)],_0x1253d7=_0x1c613d+_0x15c7d0[_0x538e69(0x4e1)]['left'],_0x10c5bd=_0x1a821e-_0x15c7d0[_0x538e69(0x4e1)]['up'],_0x17d985=_0x1a821e+_0x15c7d0[_0x538e69(0x4e1)][_0x538e69(0x286)];for(let _0x1ea0e5=_0x1f41a3;_0x1ea0e5<=_0x1253d7;_0x1ea0e5++){for(let _0x465c38=_0x10c5bd;_0x465c38<=_0x17d985;_0x465c38++){if(this[_0x538e69(0x606)](_0x1ea0e5,_0x465c38))return![];}}return!![];},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x461)]=function(_0x40bf20){const _0x29c176=_0x303df0;$gameTemp[_0x29c176(0x1b9)]=_0x40bf20;const _0x17be53=new Game_Event(_0x40bf20[_0x29c176(0x2c6)],_0x40bf20[_0x29c176(0x68d)]);$gameTemp['_spawnData']=undefined,this[_0x29c176(0x4ab)][_0x29c176(0x1bc)](_0x17be53),_0x17be53[_0x29c176(0x5da)](_0x40bf20),this[_0x29c176(0x629)]();},Game_Map[_0x303df0(0x2e5)]['prepareSpawnedEventAtXY']=function(_0xe564be,_0x1b8934,_0x56c180){const _0x464cae=_0x303df0,_0x1e13a4=_0xe564be[_0x464cae(0x488)][_0x464cae(0x4dc)]()['trim']();if(_0x1e13a4!==_0x464cae(0x38b)){if(_0x464cae(0x43d)!==_0x464cae(0x39a)){const _0x59e832=VisuMZ['EventTemplates'][_0x1e13a4];_0x59e832&&(_0x464cae(0x1ed)!==_0x464cae(0x1ed)?(_0x55851d[_0x464cae(0x1ca)][_0x464cae(0x350)]=this[_0x464cae(0x251)](),_0xadf31e[_0x464cae(0x1ca)][_0x464cae(0x538)]=_0x14eb6c[_0x464cae(0x57b)](_0x3cb561[_0x464cae(0x1ca)]['_filename'])):(_0xe564be[_0x464cae(0x2c6)]=_0x59e832[_0x464cae(0x4d9)],_0xe564be[_0x464cae(0x68d)]=_0x59e832['EventID']));}else{if(_0x4fb2fa[_0x464cae(0x1af)]())return![];return _0x2f5a6e['MapSwitches'][_0x464cae(0x37c)](_0x2694d0);}}const _0x123755=_0xe564be['x'],_0x2f6d87=_0xe564be['y'];if(!this['isValid'](_0x123755,_0x2f6d87))return![];if(_0x1b8934){if(_0x464cae(0x4b1)!==_0x464cae(0x3ce)){if(this['checkExistingEntitiesAt'](_0x123755,_0x2f6d87))return![];if(!this['isSpawnHitboxCollisionOk'](_0xe564be,_0x123755,_0x2f6d87))return![];}else return _0x4d8bc2[_0x464cae(0x28b)]['Game_CommonEvent_isActive'][_0x464cae(0x249)](this)?!![]:_0x3f2d4a[_0x464cae(0x28b)][_0x464cae(0x4a8)][_0x464cae(0x49a)](this[_0x464cae(0x5db)]()['CPC'],this[_0x464cae(0x222)]);}if(_0x56c180){if(!this[_0x464cae(0x186)](_0x123755,_0x2f6d87))return![];}return this[_0x464cae(0x461)](_0xe564be),!![];},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x3ad)]=function(_0x1e83cd,_0x494fe9,_0x1b5ca0,_0x364fda){const _0x5e1556=_0x303df0,_0x1a3661=[],_0x53bde8=this[_0x5e1556(0x2f2)](),_0x26c691=this['height']();for(let _0x551161=0x0;_0x551161<_0x53bde8;_0x551161++){for(let _0x499c2c=0x0;_0x499c2c<_0x26c691;_0x499c2c++){if(!_0x494fe9[_0x5e1556(0x37c)](this[_0x5e1556(0x389)](_0x551161,_0x499c2c)))continue;if(!this['isValid'](_0x551161,_0x499c2c))continue;if(_0x1b5ca0){if(_0x5e1556(0x409)===_0x5e1556(0x409)){if(this['checkExistingEntitiesAt'](_0x551161,_0x499c2c))continue;if(!this[_0x5e1556(0x428)](_0x1e83cd,_0x551161,_0x499c2c))continue;}else return _0x1cd681>=0x3e8?(_0x18caed-=0x3e8,this['_spawnedEvents'][_0xfbab80]):_0x5244cd[_0x5e1556(0x28b)][_0x5e1556(0x557)][_0x5e1556(0x249)](this,_0x53afeb);}if(_0x364fda){if('LonJX'!==_0x5e1556(0x50c)){_0x39e351['EventsMoveCore'][_0x5e1556(0x3b3)][_0x5e1556(0x249)](this,_0x500db2);if(_0x5c2f20>=0x3e8){const _0x280da9=this[_0x5e1556(0x5db)](_0x3ea557);if(_0x280da9)_0x280da9[_0x5e1556(0x320)]();}}else{if(!this['isPassableByAnyDirection'](_0x551161,_0x499c2c))continue;}}_0x1a3661[_0x5e1556(0x1bc)]([_0x551161,_0x499c2c]);}}if(_0x1a3661[_0x5e1556(0x21b)]>0x0){const _0x133afa=_0x1a3661[Math[_0x5e1556(0x5b1)](_0x1a3661[_0x5e1556(0x21b)])];return _0x1e83cd['x']=_0x133afa[0x0],_0x1e83cd['y']=_0x133afa[0x1],this[_0x5e1556(0x461)](_0x1e83cd),!![];}return![];},Game_Map['prototype'][_0x303df0(0x601)]=function(_0x3ddfed,_0x3172ec,_0x29feea,_0x20bdab){const _0x3e8792=_0x303df0,_0x3b6145=[],_0x4812ff=this[_0x3e8792(0x2f2)](),_0x2f1503=this[_0x3e8792(0x48f)]();for(let _0x217f24=0x0;_0x217f24<_0x4812ff;_0x217f24++){for(let _0x104603=0x0;_0x104603<_0x2f1503;_0x104603++){if(!_0x3172ec['includes'](this[_0x3e8792(0x376)](_0x217f24,_0x104603)))continue;if(!this[_0x3e8792(0x2ff)](_0x217f24,_0x104603))continue;if(_0x29feea){if(this[_0x3e8792(0x606)](_0x217f24,_0x104603))continue;if(!this[_0x3e8792(0x428)](_0x3ddfed,_0x217f24,_0x104603))continue;}if(_0x20bdab){if(!this[_0x3e8792(0x186)](_0x217f24,_0x104603))continue;}_0x3b6145[_0x3e8792(0x1bc)]([_0x217f24,_0x104603]);}}if(_0x3b6145['length']>0x0){if(_0x3e8792(0x515)===_0x3e8792(0x515)){const _0x1e4db1=_0x3b6145[Math[_0x3e8792(0x5b1)](_0x3b6145[_0x3e8792(0x21b)])];return _0x3ddfed['x']=_0x1e4db1[0x0],_0x3ddfed['y']=_0x1e4db1[0x1],this[_0x3e8792(0x461)](_0x3ddfed),!![];}else return _0x3b65ce[_0x3e8792(0x34b)](this)?_0x182f2e[_0x3e8792(0x2e5)]['getEventIconData'][_0x3e8792(0x249)](this):{'iconIndex':0x0,'bufferX':_0x1acb8a[_0x3e8792(0x4a4)]['BufferX'],'bufferY':_0x538095[_0x3e8792(0x4a4)][_0x3e8792(0x62c)],'blendMode':_0x155584['Icon'][_0x3e8792(0x504)]};}return![];},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x186)]=function(_0x3b8ab3,_0x3f7ca8){const _0x75c38c=_0x303df0;if(this['isPassable'](_0x3b8ab3,_0x3f7ca8,0x2))return!![];if(this[_0x75c38c(0x37e)](_0x3b8ab3,_0x3f7ca8,0x4))return!![];if(this['isPassable'](_0x3b8ab3,_0x3f7ca8,0x6))return!![];if(this[_0x75c38c(0x37e)](_0x3b8ab3,_0x3f7ca8,0x8))return!![];return![];},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x44a)]=function(_0x269c4d){const _0x16fa9f=_0x303df0;if(_0x269c4d<0x3e8)return;if(!this[_0x16fa9f(0x4ab)])return;const _0x12d778=this[_0x16fa9f(0x5db)](_0x269c4d);_0x12d778[_0x16fa9f(0x415)](-0x1,-0x1),_0x12d778[_0x16fa9f(0x467)](),this['_spawnedEvents'][_0x269c4d-0x3e8]=null,this[_0x16fa9f(0x629)]();},Game_Map['prototype'][_0x303df0(0x33d)]=function(){const _0x37dc97=_0x303df0;for(const _0x3e6136 of this[_0x37dc97(0x4ab)]){if(_0x3e6136)return _0x3e6136;}return null;},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x605)]=function(){const _0x24258d=_0x303df0,_0x56853c=this[_0x24258d(0x33d)]();return _0x56853c?_0x56853c[_0x24258d(0x221)]:0x0;},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x4ac)]=function(){const _0xa7b524=_0x303df0,_0x554ba1=this['_spawnedEvents'][_0xa7b524(0x355)](0x0)[_0xa7b524(0x3a3)]();for(const _0x151103 of _0x554ba1){if('ieZuE'===_0xa7b524(0x1f7)){const _0x1f38b5=_0x2ce17a[_0xa7b524(0x4be)](this);if(!_0x1f38b5)return;this['locate'](_0x1f38b5['x'],_0x1f38b5['y']),this[_0xa7b524(0x4e2)](_0x1f38b5['direction']),this[_0xa7b524(0x3a1)]===_0x1f38b5[_0xa7b524(0x1ce)]&&(this[_0xa7b524(0x4d5)]=_0x1f38b5[_0xa7b524(0x37a)]);}else{if(_0x151103)return _0x151103;}}return null;},Game_Map[_0x303df0(0x2e5)]['lastSpawnedEventID']=function(){const _0x5948df=_0x303df0,_0x547563=this[_0x5948df(0x4ac)]();return _0x547563?_0x547563[_0x5948df(0x221)]:0x0;},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x472)]=function(_0x10c756,_0x1cb6da){const _0x280716=_0x303df0,_0x2c27ba=this['eventsXy'](_0x10c756,_0x1cb6da);for(const _0x23f1f0 of _0x2c27ba){if('HHbBi'!==_0x280716(0x451)){let _0x158780={};_0x273191>=0x0?_0x158780=_0x57f24f[_0x356f20]:(_0x28591d[_0x280716(0x1bc)](_0x158780),_0x1f4964['push'](_0x48dd42)),_0x158780[_0x280716(0x3bb)]=_0x3bee33,_0x158780['x']=_0x161379,_0x158780['y']=_0x5471af,_0x158780['g']=_0xbab718,_0x158780['f']=_0x2ec784+_0x3c672a[_0x280716(0x561)](_0x81a44f,_0x1c4819,_0x111c9b,_0xf491b2),(!_0x4e6c59||_0x158780['f']-_0x158780['g']<_0x26928d['f']-_0x2dcb72['g'])&&(_0x483e20=_0x158780);}else{if(!_0x23f1f0)continue;if(_0x23f1f0[_0x280716(0x5e2)]())this[_0x280716(0x44a)](_0x23f1f0['_eventId']);}}},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x5d8)]=function(_0x2619b1){const _0x13a2ac=_0x303df0;for(const _0x221f99 of this[_0x13a2ac(0x4ab)]){if(!_0x221f99)continue;_0x2619b1[_0x13a2ac(0x37c)](_0x221f99['regionId']())&&this[_0x13a2ac(0x44a)](_0x221f99[_0x13a2ac(0x221)]);}},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x594)]=function(_0x33f066){const _0x35f0f1=_0x303df0;for(const _0x8f00e5 of this[_0x35f0f1(0x4ab)]){if(!_0x8f00e5)continue;_0x33f066[_0x35f0f1(0x37c)](_0x8f00e5[_0x35f0f1(0x376)]())&&this[_0x35f0f1(0x44a)](_0x8f00e5[_0x35f0f1(0x221)]);}},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x192)]=function(){const _0x2fe29b=_0x303df0;for(const _0x1fdb53 of this['_spawnedEvents']){if(!_0x1fdb53)continue;this[_0x2fe29b(0x44a)](_0x1fdb53[_0x2fe29b(0x221)]);}},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x3b3)]=Game_Map[_0x303df0(0x2e5)][_0x303df0(0x50e)],Game_Map['prototype'][_0x303df0(0x50e)]=function(_0x48721e){const _0x9aa530=_0x303df0;VisuMZ[_0x9aa530(0x28b)]['Game_Map_unlockEvent']['call'](this,_0x48721e);if(_0x48721e>=0x3e8){const _0x16cfcd=this[_0x9aa530(0x5db)](_0x48721e);if(_0x16cfcd)_0x16cfcd['unlock']();}},Game_Map['prototype'][_0x303df0(0x273)]=function(){const _0x4be6e1=_0x303df0;this['_forceShowPlayer']=![],this[_0x4be6e1(0x65b)]=![];if(!$dataMap)return;const _0x41bf8a=$dataMap['note']||'';if(_0x41bf8a['match'](/<HIDE PLAYER>/i))_0x4be6e1(0x486)==='UtWsW'?(this['_forceShowPlayer']=![],this[_0x4be6e1(0x65b)]=!![]):(_0x33d1e1[_0x4be6e1(0x28b)][_0x4be6e1(0x556)][_0x4be6e1(0x249)](this),this['checkNeedForPeriodicRefresh']());else _0x41bf8a[_0x4be6e1(0x5bf)](/<SHOW PLAYER>/i)&&(this[_0x4be6e1(0x240)]=!![],this[_0x4be6e1(0x65b)]=![]);},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x1f6)]=function(){const _0x468a69=_0x303df0;return this[_0x468a69(0x240)]===undefined&&this[_0x468a69(0x273)](),this[_0x468a69(0x240)];},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x4b4)]=function(){const _0x569d0f=_0x303df0;return this[_0x569d0f(0x65b)]===undefined&&this[_0x569d0f(0x273)](),this[_0x569d0f(0x65b)];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x1a4)]=Game_CharacterBase['prototype']['isTransparent'],Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x413)]=function(){const _0x548a52=_0x303df0;if(this===$gamePlayer){if(_0x548a52(0x404)!==_0x548a52(0x27a)){if($gameMap[_0x548a52(0x1f6)]())return![];if($gameMap[_0x548a52(0x4b4)]())return!![];}else this[_0x548a52(0x668)][_0x548a52(0x650)]=_0x4a7e49(_0x73f054['$1'])['trim']();}return VisuMZ[_0x548a52(0x28b)][_0x548a52(0x1a4)][_0x548a52(0x249)](this);},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x62f)]=function(){const _0x30e34a=_0x303df0;this[_0x30e34a(0x2ed)]=![],this['_forceHideFollower']=![];if(!$dataMap)return;const _0x23c59a=$dataMap[_0x30e34a(0x5bd)]||'';if(_0x23c59a[_0x30e34a(0x5bf)](/<HIDE FOLLOWERS>/i))this[_0x30e34a(0x2ed)]=![],this[_0x30e34a(0x37f)]=!![];else{if(_0x23c59a[_0x30e34a(0x5bf)](/<SHOW FOLLOWERS>/i)){if(_0x30e34a(0x448)!==_0x30e34a(0x448)){if(_0x56e36a['isPlayerForceShown']())return![];if(_0x274cbd[_0x30e34a(0x4b4)]())return!![];}else this[_0x30e34a(0x2ed)]=!![],this[_0x30e34a(0x37f)]=![];}}},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x340)]=function(){const _0x1ac8b8=_0x303df0;return this['_forceShowFollower']===undefined&&this[_0x1ac8b8(0x62f)](),this[_0x1ac8b8(0x2ed)];},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x489)]=function(){const _0x45445e=_0x303df0;if(this[_0x45445e(0x37f)]===undefined){if(_0x45445e(0x19a)!=='pkXZR'){const _0x49b42e={'template':'Button','mapId':0x1,'eventId':0xc,'x':_0x5126e0['x']+0x1,'y':_0x25aeb8['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x45445e(0x4ab)]['length']+0x3e8};this[_0x45445e(0x461)](_0x49b42e);}else this[_0x45445e(0x62f)]();}return this[_0x45445e(0x37f)];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x1d3)]=Game_Followers[_0x303df0(0x2e5)][_0x303df0(0x2c5)],Game_Followers[_0x303df0(0x2e5)]['isVisible']=function(){const _0x538d1f=_0x303df0;if($gameMap[_0x538d1f(0x340)]())return!![];if($gameMap['areFollowersForceHidden']())return![];return VisuMZ[_0x538d1f(0x28b)][_0x538d1f(0x1d3)][_0x538d1f(0x249)](this);},Game_CommonEvent[_0x303df0(0x2e5)][_0x303df0(0x4c1)]=function(){const _0x5dea86=_0x303df0,_0x55deda=this[_0x5dea86(0x5db)]();return this[_0x5dea86(0x334)]()&&_0x55deda[_0x5dea86(0x38a)]>=0x1&&DataManager[_0x5dea86(0x1b5)](_0x55deda['switchId']);},Game_CommonEvent[_0x303df0(0x2e5)][_0x303df0(0x3d3)]=function(){const _0x4905bf=_0x303df0;return VisuMZ['EventsMoveCore'][_0x4905bf(0x4a8)][_0x4905bf(0x512)][_0x4905bf(0x37c)](this[_0x4905bf(0x222)]);},VisuMZ[_0x303df0(0x28b)]['Game_CommonEvent_isActive']=Game_CommonEvent[_0x303df0(0x2e5)][_0x303df0(0x334)],Game_CommonEvent[_0x303df0(0x2e5)][_0x303df0(0x334)]=function(){const _0x310782=_0x303df0;if(VisuMZ[_0x310782(0x28b)]['Game_CommonEvent_isActive']['call'](this))return!![];else{if(_0x310782(0x5ba)==='VGVHu'){if([0x1,0x4,0x7]['includes'](_0x5689c3))_0x254c8b-=0x1;if([0x3,0x6,0x9][_0x310782(0x37c)](_0x56566b))_0x4a5d6d+=0x1;return this[_0x310782(0x5d3)](_0x211edc);}else return VisuMZ[_0x310782(0x28b)][_0x310782(0x4a8)]['metCPC'](this[_0x310782(0x5db)]()['CPC'],this[_0x310782(0x222)]);}},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x67b)]=Game_Map[_0x303df0(0x2e5)][_0x303df0(0x299)],Game_Map[_0x303df0(0x2e5)][_0x303df0(0x299)]=function(){const _0x5736fd=_0x303df0,_0x2804a5=VisuMZ['EventsMoveCore'][_0x5736fd(0x67b)]['call'](this),_0x514136=VisuMZ['EventsMoveCore'][_0x5736fd(0x4a8)][_0x5736fd(0x512)][_0x5736fd(0x1ee)](_0x4853a0=>$dataCommonEvents[_0x4853a0]);return _0x2804a5[_0x5736fd(0x5ae)](_0x514136)[_0x5736fd(0x528)]((_0x5053ac,_0x5e8a1b,_0x1d9a01)=>_0x1d9a01[_0x5736fd(0x2dc)](_0x5053ac)===_0x5e8a1b);},VisuMZ['EventsMoveCore'][_0x303df0(0x32f)]=Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x41c)],Game_CharacterBase['prototype'][_0x303df0(0x41c)]=function(){const _0x225bcc=_0x303df0;VisuMZ[_0x225bcc(0x28b)][_0x225bcc(0x32f)][_0x225bcc(0x249)](this),this[_0x225bcc(0x5fe)]();},Game_CharacterBase['prototype']['initEventsMoveCoreSettings']=function(){const _0x271907=_0x303df0;this[_0x271907(0x2f6)]=![],this[_0x271907(0x55c)](),this[_0x271907(0x1d0)](),this[_0x271907(0x2d0)](),this[_0x271907(0x599)]();},VisuMZ['EventsMoveCore'][_0x303df0(0x44f)]=Game_CharacterBase['prototype'][_0x303df0(0x3c7)],Game_CharacterBase['prototype'][_0x303df0(0x3c7)]=function(){const _0x558475=_0x303df0;let _0x49d714=VisuMZ[_0x558475(0x28b)][_0x558475(0x44f)][_0x558475(0x249)](this);return _0x49d714=this[_0x558475(0x66a)](_0x49d714),_0x49d714;},Game_CharacterBase['prototype'][_0x303df0(0x66a)]=function(_0x2b023d){return _0x2b023d;},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x263)]=function(){const _0x1db8fc=_0x303df0;if(this['constructor']===Game_Player&&this['isInVehicle']())return this[_0x1db8fc(0x3db)]()[_0x1db8fc(0x508)]()[_0x1db8fc(0x5bf)](/\[VS8\]/i);else{if(Imported[_0x1db8fc(0x684)]&&this['hasDragonbones']())return!![];else{if('YXnVZ'===_0x1db8fc(0x41b)){const _0x39bba6=_0x1db8fc(0x1a6)['format'](_0x165165[_0x1db8fc(0x58d)](0x0)[_0x1db8fc(0x4dc)]()+_0xd45028[_0x1db8fc(0x355)](0x1));if(_0x127bac[_0x39bba6])return _0x95d70c[_0x39bba6]['includes'](_0x42216c);}else return this[_0x1db8fc(0x508)]()[_0x1db8fc(0x5bf)](/\[VS8\]/i);}}},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x500)]=Game_CharacterBase['prototype'][_0x303df0(0x5a9)],Game_CharacterBase['prototype'][_0x303df0(0x5a9)]=function(){const _0x591b69=_0x303df0;if(this[_0x591b69(0x541)]()&&!this[_0x591b69(0x637)]()&&this[_0x591b69(0x263)]())return this[_0x591b69(0x631)]();else{if(this[_0x591b69(0x541)]()&&!this['isJumping']()){if(_0x591b69(0x1d9)===_0x591b69(0x1c4)){const _0x8c5a3a=_0x3c5a09[_0x591b69(0x53a)][_0x591b69(0x295)];if(_0x8c5a3a){const _0x4687f8=_0x8c5a3a[_0x591b69(0x302)](this);_0x4687f8&&_0x4687f8['_shadowSprite']&&_0x4687f8[_0x591b69(0x1ca)][_0x591b69(0x350)]!==this[_0x591b69(0x251)]()&&(_0x4687f8[_0x591b69(0x1ca)][_0x591b69(0x350)]=this['shadowFilename'](),_0x4687f8[_0x591b69(0x1ca)][_0x591b69(0x538)]=_0x5e1259[_0x591b69(0x57b)](_0x4687f8[_0x591b69(0x1ca)][_0x591b69(0x350)]));}}else return 0x8;}else{if(this['isPosing']()&&this[_0x591b69(0x263)]()){if(_0x591b69(0x5b3)!==_0x591b69(0x5b3)){const _0x304bfd=_0xc53245[_0x591b69(0x1b9)][_0x591b69(0x2c6)],_0x4cf3ad=_0x464805[_0x591b69(0x1b9)][_0x591b69(0x68d)];return _0x24e355[_0x591b69(0x4a7)](_0x304bfd,_0x4cf3ad);}else return this[_0x591b69(0x434)]();}else return VisuMZ['EventsMoveCore'][_0x591b69(0x500)]['call'](this);}}},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x5f1)]=Game_CharacterBase['prototype'][_0x303df0(0x4e2)],Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x4e2)]=function(_0x4f24ae){const _0x13a23f=_0x303df0;if(!this[_0x13a23f(0x263)]())_0x4f24ae=this[_0x13a23f(0x60b)](_0x4f24ae);VisuMZ[_0x13a23f(0x28b)]['Game_CharacterBase_setDirection'][_0x13a23f(0x249)](this,_0x4f24ae);},Game_CharacterBase[_0x303df0(0x2e5)]['correctFacingDirection']=function(_0x27c3e2){const _0x3c2900=_0x303df0;if(_0x27c3e2===0x1)return this[_0x3c2900(0x40f)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x27c3e2===0x3)return this[_0x3c2900(0x40f)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x27c3e2===0x7)return this[_0x3c2900(0x40f)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x27c3e2===0x9)return this[_0x3c2900(0x40f)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x27c3e2;},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x54a)]=function(_0x157090){const _0x127ce4=_0x303df0;return[0x1,0x3,0x5,0x7,0x9][_0x127ce4(0x37c)](_0x157090);},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x475)]=function(){const _0x52e6e7=_0x303df0;return this[_0x52e6e7(0x305)]||0x0;},VisuMZ['EventsMoveCore']['Game_CharacterBase_moveStraight']=Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x209)],Game_CharacterBase['prototype'][_0x303df0(0x209)]=function(_0x12ab26){const _0xeb729f=_0x303df0;this[_0xeb729f(0x305)]=_0x12ab26,VisuMZ['EventsMoveCore'][_0xeb729f(0x421)]['call'](this,_0x12ab26);},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x653)]=function(_0x15d466){const _0x5270b1=_0x303df0;if(!this['isDiagonalDirection'](_0x15d466))return this['moveStraight'](_0x15d466);let _0x2a777b=0x0,_0x8fa1d4=0x0;switch(_0x15d466){case 0x1:_0x2a777b=0x4,_0x8fa1d4=0x2;break;case 0x3:_0x2a777b=0x6,_0x8fa1d4=0x2;break;case 0x7:_0x2a777b=0x4,_0x8fa1d4=0x8;break;case 0x9:_0x2a777b=0x6,_0x8fa1d4=0x8;break;}if(VisuMZ[_0x5270b1(0x28b)][_0x5270b1(0x578)]['Movement']['StrictCollision']){if(!this[_0x5270b1(0x40f)](this['_x'],this['_y'],_0x2a777b))return this['moveStraight'](_0x8fa1d4);if(!this[_0x5270b1(0x40f)](this['_x'],this['_y'],_0x8fa1d4)){if(_0x5270b1(0x425)!==_0x5270b1(0x470))return this[_0x5270b1(0x209)](_0x2a777b);else{_0x9b3e53[_0x5270b1(0x64e)](_0x52549d,_0x6674db);const _0x6998c4=_0x159a65[_0x5270b1(0x2bb)]();_0x21a0be[_0x5270b1(0x463)]=_0xdaee55[_0x5270b1(0x463)]||_0x28a2c7[_0x5270b1(0x2c6)]();const _0x11925f=[_0x31a175[_0x5270b1(0x463)],_0x99cf4d[_0x5270b1(0x353)]||_0x6998c4[_0x5270b1(0x68d)](),_0x5270b1(0x48e)[_0x5270b1(0x660)](_0x54ead0[_0x5270b1(0x55a)])],_0x2f2ecb=_0x33fa08[_0x5270b1(0x40d)],_0x2c1ac4=_0x111a46['value'](_0x11925f)||![];_0x5f2718['setValue'](_0x2f2ecb,_0x2c1ac4);}}if(!this[_0x5270b1(0x655)](this['_x'],this['_y'],_0x2a777b,_0x8fa1d4)){let _0x17a54f=VisuMZ[_0x5270b1(0x28b)][_0x5270b1(0x578)]['Movement']['FavorHorz']?_0x2a777b:_0x8fa1d4;return this[_0x5270b1(0x209)](_0x17a54f);}}this['_lastMovedDirection']=_0x15d466,this[_0x5270b1(0x335)](_0x2a777b,_0x8fa1d4);},VisuMZ['EventsMoveCore']['Game_CharacterBase_realMoveSpeed']=Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x61a)],Game_CharacterBase['prototype'][_0x303df0(0x61a)]=function(){const _0x39725b=_0x303df0;let _0x53d119=this[_0x39725b(0x3d7)];if(this['isDashing']()){if(_0x39725b(0x549)===_0x39725b(0x549))_0x53d119+=this[_0x39725b(0x2f7)]();else return this[_0x39725b(0x678)](_0x39725b(0x42a));}return this[_0x39725b(0x3a7)](_0x53d119);},Game_CharacterBase['prototype'][_0x303df0(0x2f7)]=function(){const _0x397203=_0x303df0,_0x32634e=VisuMZ[_0x397203(0x28b)][_0x397203(0x578)][_0x397203(0x3bf)];if(_0x32634e[_0x397203(0x647)]!==undefined){if(_0x397203(0x212)!=='LEeon'){if(this['canPass'](this['x'],this['y'],_0x198789))_0x33d980[_0x397203(0x1bc)](_0xde16b0);}else return _0x32634e[_0x397203(0x647)];}else return VisuMZ[_0x397203(0x28b)][_0x397203(0x235)][_0x397203(0x249)](this)-this[_0x397203(0x3d7)];},Game_CharacterBase['prototype'][_0x303df0(0x3a7)]=function(_0x28aca8){const _0x1c0119=_0x303df0,_0x219668=VisuMZ[_0x1c0119(0x28b)]['Settings'][_0x1c0119(0x3bf)];if(!_0x219668['SlowerSpeed'])return _0x28aca8;return[0x1,0x3,0x7,0x9][_0x1c0119(0x37c)](this[_0x1c0119(0x305)])&&(_0x28aca8*=_0x219668[_0x1c0119(0x622)]||0.01),_0x28aca8;},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x388)]=Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x225)],Game_CharacterBase['prototype'][_0x303df0(0x225)]=function(){const _0x1657c8=_0x303df0;if(this['_forceDashing'])return!![];return VisuMZ[_0x1657c8(0x28b)][_0x1657c8(0x388)]['call'](this);},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x327)]=function(){const _0x3d4025=_0x303df0;return this[_0x3d4025(0x225)]()&&this[_0x3d4025(0x4dd)]===0x0;},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x288)]=Game_CharacterBase[_0x303df0(0x2e5)]['pattern'],Game_CharacterBase[_0x303df0(0x2e5)]['pattern']=function(){const _0x349f5b=_0x303df0;if(this[_0x349f5b(0x548)]()){if(_0x349f5b(0x319)!==_0x349f5b(0x319)){if(_0x41ae6e)this[_0x349f5b(0x1ae)](_0x1a0df7['x'],_0x5bac1f['y']);}else return this[_0x349f5b(0x4a1)]();}else return VisuMZ[_0x349f5b(0x28b)][_0x349f5b(0x288)][_0x349f5b(0x249)](this);},VisuMZ['EventsMoveCore'][_0x303df0(0x586)]=Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x49d)],Game_CharacterBase[_0x303df0(0x2e5)]['increaseSteps']=function(){const _0x575149=_0x303df0;VisuMZ[_0x575149(0x28b)][_0x575149(0x586)][_0x575149(0x249)](this),this['clearPose']();},VisuMZ['EventsMoveCore'][_0x303df0(0x204)]=Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x25b)],Game_CharacterBase[_0x303df0(0x2e5)]['characterIndex']=function(){const _0x2b75f9=_0x303df0;if(this[_0x2b75f9(0x263)]())return this[_0x2b75f9(0x243)]();return VisuMZ[_0x2b75f9(0x28b)][_0x2b75f9(0x204)][_0x2b75f9(0x249)](this);},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x243)]=function(){const _0x3e1602=_0x303df0,_0x147908=this[_0x3e1602(0x5a9)]();if(this[_0x3e1602(0x637)]()){if([0x2,0x4,0x6,0x8][_0x3e1602(0x37c)](_0x147908))return 0x4;if([0x1,0x3,0x7,0x9][_0x3e1602(0x37c)](_0x147908))return 0x5;}else{if(this[_0x3e1602(0x541)]()){if('mvzKD'!==_0x3e1602(0x547)){if(this[_0x3e1602(0x55e)])return![];return this[_0x3e1602(0x58c)];}else return 0x6;}else{if(this['isPosing']()){if(_0x3e1602(0x1aa)==='yCKwo'){if(_0x46f1ea[_0x3e1602(0x5bf)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x3f63d7=_0x3365b3(_0x1cb98a['$1'])[_0x3e1602(0x3ba)]()[_0x3e1602(0x573)](),_0x4a7f25=_0x1a2922(_0x188390['$2']);this[_0x3e1602(0x4e1)][_0x3f63d7]=_0x4a7f25;}}else return this[_0x3e1602(0x4e4)]();}else{if(this[_0x3e1602(0x65c)]){if(_0x3e1602(0x1e0)===_0x3e1602(0x1e0)){if([0x2,0x4,0x6,0x8][_0x3e1602(0x37c)](_0x147908))return 0x4;if([0x1,0x3,0x7,0x9][_0x3e1602(0x37c)](_0x147908))return 0x5;}else{_0x1ba371[_0x3e1602(0x64e)](_0x1b06cd,_0x490313);const _0x5c407d=(_0x224b9c[_0x3e1602(0x5bc)]||0x0)-0x1,_0xd8054c=!_0x56e588[_0x3e1602(0x435)],_0x73e0=_0x4fc119['followers']()['follower'](_0x5c407d);if(_0x73e0)_0x73e0['setChaseOff'](_0xd8054c);}}else{if(this[_0x3e1602(0x2e3)]()&&this[_0x3e1602(0x555)]()){if(_0x3e1602(0x384)!==_0x3e1602(0x220)){if([0x2,0x4,0x6,0x8]['includes'](_0x147908))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x147908))return 0x5;}else{if(_0x123a5b[_0x3e1602(0x5bf)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x2de36e[_0x3e1602(0x5bf)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];}}else{if(this['isDashingAndMoving']()){if([0x2,0x4,0x6,0x8][_0x3e1602(0x37c)](_0x147908))return 0x2;if([0x1,0x3,0x7,0x9]['includes'](_0x147908))return 0x3;}else{if('QdWIR'===_0x3e1602(0x33e))return _0x3815ea[_0x3e1602(0x5ef)][_0x3e1602(0x37c)](_0x4763d0)||_0x4566b4[_0x3e1602(0x62b)]['includes'](_0x38f1f7);else{if([0x2,0x4,0x6,0x8][_0x3e1602(0x37c)](_0x147908))return 0x0;if([0x1,0x3,0x7,0x9][_0x3e1602(0x37c)](_0x147908))return 0x1;}}}}}}}},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x555)]=function(){const _0xec95cd=_0x303df0;return VisuMZ['EventsMoveCore'][_0xec95cd(0x578)]['VS8'][_0xec95cd(0x1f9)];},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x185)]=function(){const _0xb415f0=_0x303df0;return this[_0xb415f0(0x541)]()&&this['terrainTag']()===VisuMZ['EventsMoveCore'][_0xb415f0(0x578)][_0xb415f0(0x59a)][_0xb415f0(0x45e)];},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x631)]=function(){const _0x1a3531=_0x303df0;return this[_0x1a3531(0x185)]()?_0x1a3531(0x233)!=='OhiUD'?0x4:_0x356119[_0x1a3531(0x28b)][_0x1a3531(0x500)][_0x1a3531(0x249)](this):0x2;},VisuMZ[_0x303df0(0x28b)]['Game_CharacterBase_update']=Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x3c1)],Game_CharacterBase[_0x303df0(0x2e5)]['update']=function(){const _0x140c0f=_0x303df0;VisuMZ[_0x140c0f(0x28b)][_0x140c0f(0x5d7)][_0x140c0f(0x249)](this),this[_0x140c0f(0x478)]();},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x478)]=function(){const _0x384c28=_0x303df0;this[_0x384c28(0x412)]=this['_poseDuration']||0x0;if(this['_poseDuration']>0x0){if(_0x384c28(0x60a)!==_0x384c28(0x60a))return this[_0x384c28(0x456)]();else{this['_poseDuration']--;if(this['_poseDuration']<=0x0&&this[_0x384c28(0x674)]!==_0x384c28(0x342))this[_0x384c28(0x55c)]();}}},VisuMZ[_0x303df0(0x28b)]['Game_CharacterBase_moveDiagonally']=Game_CharacterBase['prototype'][_0x303df0(0x335)],Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x335)]=function(_0x5816af,_0x447c2c){const _0x3a88c1=_0x303df0;VisuMZ['EventsMoveCore'][_0x3a88c1(0x543)][_0x3a88c1(0x249)](this,_0x5816af,_0x447c2c);if(this[_0x3a88c1(0x263)]())this[_0x3a88c1(0x26f)](_0x5816af,_0x447c2c);},Game_CharacterBase[_0x303df0(0x2e5)]['setDiagonalDirection']=function(_0x1020b8,_0x16046c){const _0x25e882=_0x303df0;if(_0x1020b8===0x4&&_0x16046c===0x2)this['setDirection'](0x1);if(_0x1020b8===0x6&&_0x16046c===0x2)this[_0x25e882(0x4e2)](0x3);if(_0x1020b8===0x4&&_0x16046c===0x8)this[_0x25e882(0x4e2)](0x7);if(_0x1020b8===0x6&&_0x16046c===0x8)this[_0x25e882(0x4e2)](0x9);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x595)]=Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x5e0)],Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x5e0)]=function(){const _0x2ff63e=_0x303df0;if(this['isPosing']()&&this['getPose']()===_0x2ff63e(0x342))return!![];return VisuMZ[_0x2ff63e(0x28b)]['Game_CharacterBase_hasStepAnime'][_0x2ff63e(0x249)](this);},Game_CharacterBase['prototype']['setPose']=function(_0x1a6f93,_0x5808a3){const _0x17e7bc=_0x303df0;if(_0x1a6f93[_0x17e7bc(0x5bf)](/Z/i))_0x1a6f93=_0x17e7bc(0x342);if(_0x1a6f93[_0x17e7bc(0x5bf)](/SLEEP/i))_0x1a6f93='ZZZ';this[_0x17e7bc(0x263)]()&&(_0x17e7bc(0x35b)!=='vNSNT'?(_0x2763f2[_0x17e7bc(0x627)](_0x2bd769['_selfTargetNumberInput']),_0x463b81[_0x17e7bc(0x28b)][_0x17e7bc(0x5f3)][_0x17e7bc(0x249)](this),_0x1fa496['clearSelfTarget']()):(this[_0x17e7bc(0x674)]=_0x1a6f93['toUpperCase']()[_0x17e7bc(0x573)](),this['_poseDuration']=_0x5808a3||Infinity));},Game_CharacterBase[_0x303df0(0x2e5)]['getPose']=function(){const _0x2e4ecf=_0x303df0;return this[_0x2e4ecf(0x263)]()?(this[_0x2e4ecf(0x674)]||'')[_0x2e4ecf(0x4dc)]()[_0x2e4ecf(0x573)]():''[_0x2e4ecf(0x4dc)]()['trim']();},Game_CharacterBase['prototype'][_0x303df0(0x3d9)]=function(_0x3a20b4,_0x35ed3e){const _0x422c46=_0x303df0;if(this[_0x422c46(0x263)]()){if(_0x422c46(0x3c5)!==_0x422c46(0x4b2)){const _0x11f96c=['',_0x422c46(0x359),_0x422c46(0x5ee),_0x422c46(0x22c),_0x422c46(0x30c),'ANGER',_0x422c46(0x20f),_0x422c46(0x3c3),_0x422c46(0x47a),_0x422c46(0x46c),_0x422c46(0x342),'','','','',''][_0x3a20b4];this[_0x422c46(0x53c)](_0x11f96c,_0x35ed3e);}else _0x1d0cb6[_0x422c46(0x28b)][_0x422c46(0x378)][_0x422c46(0x249)](this,_0xe2d4e6),this[_0x422c46(0x2e4)]=![];}},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x55c)]=function(){const _0x308064=_0x303df0;this['_pose']='',this[_0x308064(0x412)]=0x0;},Game_CharacterBase['prototype']['isPosing']=function(){const _0x15b35f=_0x303df0;return this['isSpriteVS8dir']()&&!!this[_0x15b35f(0x674)];},Game_CharacterBase[_0x303df0(0x2e5)]['getPosingCharacterIndex']=function(){const _0x395b75=_0x303df0,_0x112246=this['_pose'][_0x395b75(0x4dc)]();switch(this[_0x395b75(0x674)][_0x395b75(0x4dc)]()[_0x395b75(0x573)]()){case'ITEM':case'HMPH':case _0x395b75(0x3d0):case'HURT':case _0x395b75(0x423):case _0x395b75(0x1a3):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x434)]=function(){const _0x33bacc=_0x303df0;switch(this[_0x33bacc(0x674)]['toUpperCase']()){case _0x33bacc(0x359):case _0x33bacc(0x5ee):case _0x33bacc(0x22c):case'!':case'?':return 0x2;break;case _0x33bacc(0x30c):case _0x33bacc(0x552):case'SWEAT':return 0x4;break;case _0x33bacc(0x2da):case _0x33bacc(0x205):case'VICTORY':case _0x33bacc(0x3c3):case _0x33bacc(0x47a):case _0x33bacc(0x46c):return 0x6;break;case'HURT':case _0x33bacc(0x423):case _0x33bacc(0x1a3):case _0x33bacc(0x342):case _0x33bacc(0x64c):return 0x8;break;default:return VisuMZ[_0x33bacc(0x28b)]['Game_CharacterBase_setDirection'][_0x33bacc(0x249)](this);break;}},Game_CharacterBase['prototype'][_0x303df0(0x4a1)]=function(){const _0x15013b=_0x303df0;switch(this[_0x15013b(0x674)]['toUpperCase']()){case _0x15013b(0x2da):case _0x15013b(0x51d):case _0x15013b(0x359):case'!':case _0x15013b(0x30c):case _0x15013b(0x3c3):return 0x0;break;case'HMPH':case _0x15013b(0x423):case _0x15013b(0x5ee):case'?':case _0x15013b(0x552):case _0x15013b(0x47a):return 0x1;break;case _0x15013b(0x3d0):case _0x15013b(0x1a3):case'MUSIC\x20NOTE':case _0x15013b(0x20f):case _0x15013b(0x46c):return 0x2;break;default:return VisuMZ['EventsMoveCore'][_0x15013b(0x288)][_0x15013b(0x249)](this);break;}},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x390)]=function(){this['_forceCarrying']=!![];},Game_CharacterBase[_0x303df0(0x2e5)]['clearCarrying']=function(){this['_forceCarrying']=![];},Game_CharacterBase['prototype']['forceDashing']=function(){const _0x132f42=_0x303df0;this[_0x132f42(0x440)]=!![];},Game_CharacterBase[_0x303df0(0x2e5)]['clearDashing']=function(){const _0x5bab4d=_0x303df0;this[_0x5bab4d(0x440)]=![];},Game_CharacterBase[_0x303df0(0x2e5)]['isShadowVisible']=function(){const _0x1267e8=_0x303df0;if(this['isTile']())return![];if(this[_0x1267e8(0x30d)])return![];if(this['_characterName']==='')return![];if(this[_0x1267e8(0x278)]===Game_Vehicle)return![];if(this[_0x1267e8(0x413)]())return![];return!![];},Game_CharacterBase['prototype'][_0x303df0(0x519)]=function(){const _0x23b3ba=_0x303df0;if(this[_0x23b3ba(0x541)]())return!![];if(this[_0x23b3ba(0x278)]===Game_Player&&this[_0x23b3ba(0x36f)]())return!![];return![];},Game_CharacterBase['prototype'][_0x303df0(0x251)]=function(){const _0x186563=_0x303df0;return VisuMZ[_0x186563(0x28b)][_0x186563(0x578)]['Movement']['DefaultShadow'];},Game_CharacterBase[_0x303df0(0x2e5)]['shadowX']=function(){const _0x22f861=_0x303df0;return this[_0x22f861(0x3ab)]();},Game_CharacterBase[_0x303df0(0x2e5)]['shadowY']=function(){const _0x175b50=_0x303df0,_0x1e53bb=$gameMap[_0x175b50(0x234)]();return Math[_0x175b50(0x39c)](this[_0x175b50(0x5d9)]()*_0x1e53bb+_0x1e53bb);},Game_Character['prototype'][_0x303df0(0x658)]=function(_0x2fead6,_0x33f159){const _0x4f5fa6=_0x303df0,_0x8df0d=this[_0x4f5fa6(0x43e)](),_0x14f245=$gameMap[_0x4f5fa6(0x2f2)](),_0x27004f=[],_0x3070b3=[],_0x35e1b8=[],_0x2bde90={};let _0x503311=_0x2bde90;if(this['x']===_0x2fead6&&this['y']===_0x33f159)return 0x0;_0x2bde90[_0x4f5fa6(0x3bb)]=null,_0x2bde90['x']=this['x'],_0x2bde90['y']=this['y'],_0x2bde90['g']=0x0,_0x2bde90['f']=$gameMap[_0x4f5fa6(0x561)](_0x2bde90['x'],_0x2bde90['y'],_0x2fead6,_0x33f159),_0x27004f['push'](_0x2bde90),_0x3070b3[_0x4f5fa6(0x1bc)](_0x2bde90['y']*_0x14f245+_0x2bde90['x']);while(_0x27004f[_0x4f5fa6(0x21b)]>0x0){if(_0x4f5fa6(0x3cc)===_0x4f5fa6(0x2d7)){if(!_0x4a4e51[_0x4f5fa6(0x1e9)]())return;_0x412ca0[_0x4f5fa6(0x268)]();}else{let _0x5a4082=0x0;for(let _0x5b5f01=0x0;_0x5b5f01<_0x27004f[_0x4f5fa6(0x21b)];_0x5b5f01++){if(_0x4f5fa6(0x654)!==_0x4f5fa6(0x198)){if(_0x27004f[_0x5b5f01]['f']<_0x27004f[_0x5a4082]['f']){if(_0x4f5fa6(0x43b)!==_0x4f5fa6(0x540))_0x5a4082=_0x5b5f01;else{_0x15a4af['_spawnData']=_0x364ee2;const _0x1b7865=new _0x203f2b(_0x4204eb[_0x4f5fa6(0x2c6)],_0x17bb6a['eventId']);_0x5cab96[_0x4f5fa6(0x1b9)]=_0xa709e5,this['_spawnedEvents'][_0x4f5fa6(0x1bc)](_0x1b7865),_0x1b7865[_0x4f5fa6(0x5da)](_0x5bdaeb),this[_0x4f5fa6(0x629)]();}}}else _0x4d2ba1[_0x4f5fa6(0x28b)][_0x4f5fa6(0x1cd)][_0x4f5fa6(0x249)](this,_0x474b3b,_0x5b0afb);}const _0x223769=_0x27004f[_0x5a4082],_0x7549c=_0x223769['x'],_0xbe1e7d=_0x223769['y'],_0x5bc007=_0xbe1e7d*_0x14f245+_0x7549c,_0x465e25=_0x223769['g'];_0x27004f[_0x4f5fa6(0x446)](_0x5a4082,0x1),_0x3070b3[_0x4f5fa6(0x446)](_0x3070b3[_0x4f5fa6(0x2dc)](_0x5bc007),0x1),_0x35e1b8[_0x4f5fa6(0x1bc)](_0x5bc007);if(_0x223769['x']===_0x2fead6&&_0x223769['y']===_0x33f159){_0x503311=_0x223769;break;}if(_0x465e25>=_0x8df0d)continue;const _0x4e285f=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x4e703f=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x58181f=0x1;_0x58181f<0xa;_0x58181f++){if(_0x58181f===0x5)continue;const _0x45bf48=_0x58181f,_0x1f84b7=_0x4e285f[_0x58181f],_0x349a88=_0x4e703f[_0x58181f],_0x550418=$gameMap[_0x4f5fa6(0x1c6)](_0x7549c,_0x45bf48),_0x421e41=$gameMap['roundYWithDirection'](_0xbe1e7d,_0x45bf48),_0x33391f=_0x421e41*_0x14f245+_0x550418;if(_0x35e1b8['includes'](_0x33391f))continue;if(this['constructor']===Game_Player&&VisuMZ['EventsMoveCore'][_0x4f5fa6(0x578)][_0x4f5fa6(0x3bf)]['StrictCollision']){if('NLICv'!==_0x4f5fa6(0x356))return this[_0x4f5fa6(0x28e)]();else{if(!this[_0x4f5fa6(0x40f)](_0x7549c,_0xbe1e7d,_0x1f84b7))continue;if(!this['canPass'](_0x7549c,_0xbe1e7d,_0x349a88))continue;}}if(!this['canPassDiagonally'](_0x7549c,_0xbe1e7d,_0x1f84b7,_0x349a88))continue;const _0x356be2=_0x465e25+0x1,_0x37ccf6=_0x3070b3[_0x4f5fa6(0x2dc)](_0x33391f);if(_0x37ccf6<0x0||_0x356be2<_0x27004f[_0x37ccf6]['g']){let _0x45cba2={};if(_0x37ccf6>=0x0){if(_0x4f5fa6(0x277)!==_0x4f5fa6(0x277)){if(_0x329d2f)this[_0x4f5fa6(0x48b)](_0x3266c8['x'],_0x3c8736['y']);}else _0x45cba2=_0x27004f[_0x37ccf6];}else _0x27004f['push'](_0x45cba2),_0x3070b3[_0x4f5fa6(0x1bc)](_0x33391f);_0x45cba2[_0x4f5fa6(0x3bb)]=_0x223769,_0x45cba2['x']=_0x550418,_0x45cba2['y']=_0x421e41,_0x45cba2['g']=_0x356be2,_0x45cba2['f']=_0x356be2+$gameMap[_0x4f5fa6(0x561)](_0x550418,_0x421e41,_0x2fead6,_0x33f159);if(!_0x503311||_0x45cba2['f']-_0x45cba2['g']<_0x503311['f']-_0x503311['g']){if(_0x4f5fa6(0x255)!=='xDZZg')_0x503311=_0x45cba2;else{const _0x5ac217=this[_0x4f5fa6(0x444)],_0x4897d5=_0x2f83cf[this[_0x4f5fa6(0x1eb)]],_0x53ca50=_0x4897d5[_0x4f5fa6(0x659)][_0x5ac217[_0x4f5fa6(0x68d)]];if(_0x53ca50&&_0x53ca50['pages'][_0x5ac217['pageId']-0x1]){const _0x1291d4=_0x53ca50[_0x4f5fa6(0x1f0)][_0x5ac217[_0x4f5fa6(0x37b)]-0x1]['list'];this['setupChild'](_0x1291d4,this[_0x4f5fa6(0x68d)]());}_0xe316df[this[_0x4f5fa6(0x1eb)]]=_0x3a1f98,this[_0x4f5fa6(0x1eb)]=_0x1cf0ce,this[_0x4f5fa6(0x444)]=_0x3a9df0;}}}}}}let _0x59ff76=_0x503311;while(_0x59ff76[_0x4f5fa6(0x3bb)]&&_0x59ff76['parent']!==_0x2bde90){if('rDJNO'===_0x4f5fa6(0x269)){if(_0x450563!=='')_0x32c5fc+='\x0a';_0x1cd313+=_0x3dda55[_0x4f5fa6(0x3c4)][0x0];}else _0x59ff76=_0x59ff76[_0x4f5fa6(0x3bb)];}const _0xe1b1c7=$gameMap[_0x4f5fa6(0x2bc)](_0x59ff76['x'],_0x2bde90['x']),_0x30cdb5=$gameMap['deltaY'](_0x59ff76['y'],_0x2bde90['y']);if(_0xe1b1c7<0x0&&_0x30cdb5>0x0)return 0x1;if(_0xe1b1c7>0x0&&_0x30cdb5>0x0)return 0x3;if(_0xe1b1c7<0x0&&_0x30cdb5<0x0)return 0x7;if(_0xe1b1c7>0x0&&_0x30cdb5<0x0)return 0x9;if(_0x30cdb5>0x0)return 0x2;if(_0xe1b1c7<0x0)return 0x4;if(_0xe1b1c7>0x0)return 0x6;if(_0x30cdb5<0x0)return 0x8;const _0x18b1d6=this[_0x4f5fa6(0x223)](_0x2fead6),_0x49655f=this[_0x4f5fa6(0x258)](_0x33f159);if(Math[_0x4f5fa6(0x3f0)](_0x18b1d6)>Math['abs'](_0x49655f))return _0x4f5fa6(0x3e7)!==_0x4f5fa6(0x3e7)?this['processMoveRouteTeleportToCharacter'](_0x4b0dc5):_0x18b1d6>0x0?0x4:0x6;else{if(_0x49655f!==0x0){if(_0x4f5fa6(0x21f)==='QqYIg')_0xa9a107['clearDestination'](),this[_0x4f5fa6(0x2ee)]();else return _0x49655f>0x0?0x8:0x2;}}return 0x0;},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x5ea)]=Game_CharacterBase['prototype'][_0x303df0(0x40f)],Game_CharacterBase['prototype']['canPass']=function(_0x1b02a2,_0x2765d0,_0xc8b4ab){const _0x4867ca=_0x303df0;return this['_vehicleType']===_0x4867ca(0x36d)?this['vehicle']()[_0x4867ca(0x5c2)](_0x1b02a2,_0x2765d0,_0xc8b4ab):VisuMZ['EventsMoveCore'][_0x4867ca(0x5ea)][_0x4867ca(0x249)](this,_0x1b02a2,_0x2765d0,_0xc8b4ab);},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x2d0)]=function(){this['_spriteOffsetX']=0x0,this['_spriteOffsetY']=0x0;},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x339)]=Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x3ab)],Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x3ab)]=function(){const _0x40f643=_0x303df0;return VisuMZ[_0x40f643(0x28b)]['Game_CharacterBase_screenX'][_0x40f643(0x249)](this)+(this[_0x40f643(0x345)]||0x0);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x253)]=Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x397)],Game_CharacterBase[_0x303df0(0x2e5)]['screenY']=function(){const _0xcabb3d=_0x303df0;return VisuMZ[_0xcabb3d(0x28b)]['Game_CharacterBase_screenY'][_0xcabb3d(0x249)](this)+(this[_0xcabb3d(0x1ea)]||0x0);},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x599)]=function(){const _0x286d88=_0x303df0;this[_0x286d88(0x1da)]='';},VisuMZ['EventsMoveCore'][_0x303df0(0x2ef)]=Game_CharacterBase[_0x303df0(0x2e5)]['updatePattern'],Game_CharacterBase['prototype'][_0x303df0(0x2f0)]=function(){const _0x1ea74d=_0x303df0;if(this[_0x1ea74d(0x2f6)])return;if(this[_0x1ea74d(0x296)]())return;VisuMZ[_0x1ea74d(0x28b)][_0x1ea74d(0x2ef)]['call'](this);},Game_CharacterBase['prototype'][_0x303df0(0x296)]=function(){const _0x2f930f=_0x303df0;if(!this[_0x2f930f(0x5e0)]()&&this['_stopCount']>0x0)return![];switch(String(this['_stepPattern'])[_0x2f930f(0x4dc)]()[_0x2f930f(0x573)]()){case'LEFT\x20TO\x20RIGHT':this[_0x2f930f(0x63a)]+=0x1;if(this[_0x2f930f(0x63a)]>0x2)this[_0x2f930f(0x2d8)](0x0);break;case'RIGHT\x20TO\x20LEFT':this[_0x2f930f(0x63a)]-=0x1;if(this[_0x2f930f(0x63a)]<0x0)this[_0x2f930f(0x2d8)](0x2);break;case _0x2f930f(0x52d):case'SPIN\x20CW':this[_0x2f930f(0x5b5)]();break;case _0x2f930f(0x5f2):case'SPIN\x20CCW':case _0x2f930f(0x46e):case'SPIN\x20ACW':this[_0x2f930f(0x4c7)]();break;default:return![];}return!![];},Game_CharacterBase['prototype'][_0x303df0(0x34b)]=function(){const _0x572064=_0x303df0;return $gameSystem[_0x572064(0x34b)](this);},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x2e3)]=function(){const _0x6a116b=this['getEventIconData']();if(!_0x6a116b)return![];return _0x6a116b['iconIndex']>0x0;},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x224)]=function(){const _0x4f1fde=_0x303df0,_0x5c1ecc=this[_0x4f1fde(0x5a9)]();return $gameMap[_0x4f1fde(0x1c6)](this['x'],_0x5c1ecc);},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x52b)]=function(){const _0xb47daf=_0x303df0,_0x2811b2=this[_0xb47daf(0x5a9)]();return $gameMap[_0xb47daf(0x5ca)](this['y'],_0x2811b2);},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x21a)]=function(){const _0x16ba9f=_0x303df0,_0x567b92=this[_0x16ba9f(0x38c)](this[_0x16ba9f(0x5a9)]());return $gameMap[_0x16ba9f(0x1c6)](this['x'],_0x567b92);},Game_CharacterBase[_0x303df0(0x2e5)][_0x303df0(0x2d9)]=function(){const _0x5095f7=_0x303df0,_0x2cf798=this[_0x5095f7(0x38c)](this[_0x5095f7(0x5a9)]());return $gameMap[_0x5095f7(0x5ca)](this['y'],_0x2cf798);},VisuMZ['EventsMoveCore']['Game_Character_setMoveRoute']=Game_Character['prototype'][_0x303df0(0x5cc)],Game_Character[_0x303df0(0x2e5)][_0x303df0(0x5cc)]=function(_0x467855){const _0x2b6bcf=_0x303df0;route=JsonEx[_0x2b6bcf(0x257)](_0x467855),VisuMZ[_0x2b6bcf(0x28b)][_0x2b6bcf(0x44c)]['call'](this,route);},VisuMZ['EventsMoveCore'][_0x303df0(0x1c5)]=Game_Character['prototype'][_0x303df0(0x333)],Game_Character[_0x303df0(0x2e5)][_0x303df0(0x333)]=function(_0x3bfe6c){const _0x10c7d0=_0x303df0;route=JsonEx[_0x10c7d0(0x257)](_0x3bfe6c),VisuMZ[_0x10c7d0(0x28b)][_0x10c7d0(0x1c5)][_0x10c7d0(0x249)](this,route);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x5cd)]=Game_Character['prototype'][_0x303df0(0x531)],Game_Character[_0x303df0(0x2e5)][_0x303df0(0x531)]=function(_0x5c466f){const _0x3c3bef=_0x303df0,_0x44899d=Game_Character,_0x1b089f=_0x5c466f[_0x3c3bef(0x3c4)];if(_0x5c466f['code']===_0x44899d[_0x3c3bef(0x2ab)]){let _0x4bdc38=_0x5c466f['parameters'][0x0];_0x4bdc38=this['convertVariableValuesInScriptCall'](_0x4bdc38),_0x4bdc38=this['convertSelfVariableValuesInScriptCall'](_0x4bdc38),this[_0x3c3bef(0x473)](_0x5c466f,_0x4bdc38);}else{if(_0x3c3bef(0x579)!==_0x3c3bef(0x20c))VisuMZ[_0x3c3bef(0x28b)]['Game_Character_processMoveCommand']['call'](this,_0x5c466f);else{const _0x37435d=_0x278a42[_0x3c3bef(0x5db)](_0x351e87[_0x3c3bef(0x33f)]||_0x127751[_0x3c3bef(0x68d)]());if(!_0x37435d)return;_0x35169c[_0x3c3bef(0x387)]!==_0x3c3bef(0x38b)?_0x37435d['morphIntoTemplate'](_0x3ffae3[_0x3c3bef(0x387)]):_0x37435d[_0x3c3bef(0x5af)](_0x31310e['Step2MapId'],_0x40c539['Step2EventId']||_0x395dbb[_0x3c3bef(0x68d)]());}}},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x4b9)]=function(_0x129fbb){const _0x56617f=_0x303df0,_0x2410d3=/\$gameVariables\.value\((\d+)\)/gi,_0x2dd732=/\\V\[(\d+)\]/gi;while(_0x129fbb[_0x56617f(0x5bf)](_0x2410d3)){_0x129fbb=_0x129fbb[_0x56617f(0x2e6)](_0x2410d3,(_0x412110,_0x206d82)=>$gameVariables[_0x56617f(0x5a6)](parseInt(_0x206d82)));}while(_0x129fbb[_0x56617f(0x5bf)](_0x2dd732)){if(_0x56617f(0x427)!==_0x56617f(0x3b9))_0x129fbb=_0x129fbb[_0x56617f(0x2e6)](_0x2dd732,(_0x1bd6f1,_0x47d793)=>$gameVariables[_0x56617f(0x5a6)](parseInt(_0x47d793)));else{_0xe3ba6e=_0x29468d===_0x56617f(0x36d)?0x5:_0x4813ee;const _0x10665c=this[_0x56617f(0x1c6)](_0x1bb27b,_0x20c67f),_0x3afe23=this['roundYWithDirection'](_0x4230d3,_0x39baa7),_0x58073e=this['regionId'](_0x10665c,_0x3afe23),_0x378785=this[_0x56617f(0x1c2)];if(_0x378785[_0x56617f(0x3b5)]['includes'](_0x58073e))return!![];else{const _0x1f382e='%1Dock'[_0x56617f(0x660)](_0x3aac61[_0x56617f(0x58d)](0x0)[_0x56617f(0x4dc)]()+_0x2ee94a[_0x56617f(0x355)](0x1));if(_0x378785[_0x1f382e])return _0x378785[_0x1f382e]['includes'](_0x58073e);}return![];}}return _0x129fbb;},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x5d5)]=function(_0x5a41b5){const _0x2dbaeb=_0x303df0,_0x49ae63=/\\SELFVAR\[(\d+)\]/gi;while(_0x5a41b5['match'](_0x49ae63)){if(_0x2dbaeb(0x381)!==_0x2dbaeb(0x381))return![];else _0x5a41b5=_0x5a41b5['replace'](_0x49ae63,(_0x1f1e4d,_0x912cdc)=>getSelfVariableValue(this['_mapId'],this[_0x2dbaeb(0x221)],parseInt(_0x912cdc)));}return _0x5a41b5;},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x473)]=function(_0x342978,_0xf41edf){const _0x3e558f=_0x303df0;if(_0xf41edf['match'](/ANIMATION:[ ](\d+)/i)){if(_0x3e558f(0x189)!==_0x3e558f(0x44d))return this['processMoveRouteAnimation'](Number(RegExp['$1']));else{const _0x222a8f=_0x4e509f(_0x138877['$1'])[_0x3e558f(0x3ba)]()[_0x3e558f(0x573)](),_0x1b95ad=_0x249e81(_0xaf7575['$2']);this[_0x3e558f(0x4e1)][_0x222a8f]=_0x1b95ad;}}if(_0xf41edf[_0x3e558f(0x5bf)](/BALLOON:[ ](.*)/i))return this['processMoveRouteBalloon'](String(RegExp['$1']));if(_0xf41edf[_0x3e558f(0x5bf)](/FADE IN:[ ](\d+)/i))return this[_0x3e558f(0x50f)](Number(RegExp['$1']));if(_0xf41edf[_0x3e558f(0x5bf)](/FADE OUT:[ ](\d+)/i))return this[_0x3e558f(0x635)](Number(RegExp['$1']));if(_0xf41edf[_0x3e558f(0x5bf)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i)){if(_0x3e558f(0x4d7)!==_0x3e558f(0x4d7)){if(_0x1f32d0[_0x3e558f(0x50a)](_0x479fd4,_0x205030,_0x39516a,_0x3e558f(0x1dc)))return this[_0x3e558f(0x36f)]()&&this['vehicle']()?this['vehicle']()[_0x3e558f(0x64d)](_0x2bdfc0,_0x3692d3,_0x1e5869):!![];if(_0x18dbd8[_0x3e558f(0x61b)](_0x22d375,_0x33f590,_0x4f3a9d,_0x3e558f(0x1dc)))return![];return _0x5b0059[_0x3e558f(0x28b)][_0x3e558f(0x367)][_0x3e558f(0x249)](this,_0x425aa6,_0x37ecc0,_0x49f1c8);}else return this[_0x3e558f(0x390)]();}if(_0xf41edf['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x3e558f(0x2fa)]();if(_0xf41edf[_0x3e558f(0x5bf)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x3e558f(0x43a)]();if(_0xf41edf[_0x3e558f(0x5bf)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x3e558f(0x1d0)]();if(_0xf41edf[_0x3e558f(0x5bf)](/HUG:[ ]LEFT/i))return this[_0x3e558f(0x678)](_0x3e558f(0x42a));if(_0xf41edf[_0x3e558f(0x5bf)](/HUG:[ ]RIGHT/i)){if(_0x3e558f(0x245)!==_0x3e558f(0x245)){if(this[_0x3e558f(0x1cc)](_0x40cf28,_0x9d622f)['length']>0x0)return!![];if(_0x1ab563['x']===_0x428aaf&&_0xe12cb['y']===_0x2a899f)return!![];if(this[_0x3e558f(0x232)]()['posNt'](_0x39287d,_0x40150c))return!![];if(this[_0x3e558f(0x4b3)]()[_0x3e558f(0x18b)](_0x331100,_0x34fb85))return!![];return![];}else return this[_0x3e558f(0x678)]('right');}if(_0xf41edf[_0x3e558f(0x5bf)](/INDEX:[ ](\d+)/i))return this[_0x3e558f(0x315)](Number(RegExp['$1']));if(_0xf41edf[_0x3e558f(0x5bf)](/INDEX:[ ]([\+\-]\d+)/i)){const _0x4cd85b=this[_0x3e558f(0x68c)]+Number(RegExp['$1']);return this[_0x3e558f(0x315)](_0x4cd85b);}if(_0xf41edf[_0x3e558f(0x5bf)](/JUMP FORWARD:[ ](\d+)/i))return this['processMoveRouteJumpForward'](Number(RegExp['$1']));if(_0xf41edf['match'](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x3e558f(0x1cb)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0xf41edf[_0x3e558f(0x5bf)](/JUMP TO EVENT:[ ](\d+)/i)){if('QWCGg'!==_0x3e558f(0x3f5))_0x19ae05['EventsMoveCore'][_0x3e558f(0x517)][_0x3e558f(0x249)](this),this['initEventsMoveCoreEffects']();else{const _0x50f8b1=$gameMap[_0x3e558f(0x5db)](Number(RegExp['$1']));return this[_0x3e558f(0x2ec)](_0x50f8b1);}}if(_0xf41edf[_0x3e558f(0x5bf)](/JUMP TO PLAYER/i))return this[_0x3e558f(0x2ec)]($gamePlayer);if(_0xf41edf[_0x3e558f(0x5bf)](/JUMP TO HOME/i)&&this[_0x3e558f(0x68d)]){const _0x1f9c43=this[_0x3e558f(0x4fd)],_0x3fcc2f=this[_0x3e558f(0x250)];return this[_0x3e558f(0x1cb)](_0x1f9c43,_0x3fcc2f);}if(_0xf41edf['match'](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x394dc1=String(RegExp['$1']),_0xc5e24=this[_0x3e558f(0x5f8)](_0xf41edf);return this[_0x3e558f(0x316)](_0x394dc1,_0xc5e24);}if(_0xf41edf[_0x3e558f(0x5bf)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x3e558f(0x3f6)!==_0x3e558f(0x492)){const _0x5b25f0=Number(RegExp['$1']),_0x37abd3=Number(RegExp['$2']),_0x347f7a=this[_0x3e558f(0x5f8)](_0xf41edf);return this['processMoveRouteMoveTo'](_0x5b25f0,_0x37abd3,_0x347f7a);}else _0x4d9b81!==this[_0x3e558f(0x2c6)]()&&_0x20e8d9&&_0x4d4a0b[_0x3e558f(0x514)](this[_0x3e558f(0x2c6)]());}if(_0xf41edf['match'](/MOVE TO EVENT:[ ](\d+)/i)){const _0x343f5a=$gameMap[_0x3e558f(0x5db)](Number(RegExp['$1'])),_0x2f8c33=this['checkCollisionKeywords'](_0xf41edf);return this[_0x3e558f(0x610)](_0x343f5a,_0x2f8c33);}if(_0xf41edf[_0x3e558f(0x5bf)](/MOVE TO PLAYER/i)){const _0x130ffc=this[_0x3e558f(0x5f8)](_0xf41edf);return this[_0x3e558f(0x610)]($gamePlayer,_0x130ffc);}if(_0xf41edf[_0x3e558f(0x5bf)](/MOVE TO HOME/i)&&this[_0x3e558f(0x68d)]){const _0x50b78f=this[_0x3e558f(0x4fd)],_0x41e2cd=this[_0x3e558f(0x250)],_0x2c7d9b=this[_0x3e558f(0x5f8)](_0xf41edf);return this[_0x3e558f(0x2c4)](_0x50b78f,_0x41e2cd,_0x2c7d9b);}if(_0xf41edf['match'](/MOVE LOWER LEFT:[ ](\d+)/i)){if(_0x3e558f(0x307)==='cBBBW')return this[_0x3e558f(0x187)](0x1,Number(RegExp['$1']));else this[_0x3e558f(0x273)]();}if(_0xf41edf[_0x3e558f(0x5bf)](/MOVE DOWN:[ ](\d+)/i)){if(_0x3e558f(0x4f6)===_0x3e558f(0x513)){if(_0x34368d===0x0||_0x544cdb===0x0)return![];if(!_0x244d14[_0x3e558f(0x372)][_0x51d645]&&_0x35a201!==_0x4f6640[_0x3e558f(0x2c6)]())return _0x40d1f0[_0x3e558f(0x42e)]()&&_0x35c011[_0x3e558f(0x312)](_0x3e558f(0x30f)['format'](_0x5078c3)),![];return!![];}else return this[_0x3e558f(0x187)](0x2,Number(RegExp['$1']));}if(_0xf41edf[_0x3e558f(0x5bf)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x3e558f(0x187)](0x3,Number(RegExp['$1']));if(_0xf41edf['match'](/MOVE LEFT:[ ](\d+)/i))return this[_0x3e558f(0x187)](0x4,Number(RegExp['$1']));if(_0xf41edf[_0x3e558f(0x5bf)](/MOVE RIGHT:[ ](\d+)/i)){if('NovKX'!==_0x3e558f(0x67f))_0xa07075[_0x15970a]['f']<_0x50492d[_0x35b56f]['f']&&(_0x180268=_0x2cdf9b);else return this[_0x3e558f(0x187)](0x6,Number(RegExp['$1']));}if(_0xf41edf[_0x3e558f(0x5bf)](/MOVE UPPER LEFT:[ ](\d+)/i)){if(_0x3e558f(0x22a)===_0x3e558f(0x22a))return this['processMoveRouteMoveRepeat'](0x7,Number(RegExp['$1']));else{if(_0xfc198f[_0x3e558f(0x326)])return![];return _0x40289b[_0x3e558f(0x28b)]['Game_Event_isCollidedWithPlayerCharacters']['call'](this,_0x33cd14,_0x517150);}}if(_0xf41edf['match'](/MOVE UP:[ ](\d+)/i))return this[_0x3e558f(0x187)](0x8,Number(RegExp['$1']));if(_0xf41edf[_0x3e558f(0x5bf)](/MOVE UPPER RIGHT:[ ](\d+)/i)){if('BkJha'!==_0x3e558f(0x656)){if(!_0x4e39ca[_0x3e558f(0x53a)])return;if(!_0xd45d46[_0x3e558f(0x53a)][_0x3e558f(0x295)])return;const _0x4bbcd7=_0x4dbced[_0x3e558f(0x53a)][_0x3e558f(0x295)][_0x3e558f(0x302)](this[_0x3e558f(0x2bd)]);if(!_0x4bbcd7)return;this['x']=_0x41d834[_0x3e558f(0x4eb)](this[_0x3e558f(0x2bd)][_0x3e558f(0x3ab)]()-_0x4fdf85[_0x3e558f(0x39c)](this[_0x3e558f(0x2f2)]*this['scale']['x']/0x2)),this['x']+=this[_0x3e558f(0x2bd)][_0x3e558f(0x668)][_0x3e558f(0x301)],this['y']=this[_0x3e558f(0x2bd)][_0x3e558f(0x397)]()-_0x4bbcd7[_0x3e558f(0x48f)],this['y']+=_0x338a0b[_0x3e558f(0x4eb)](_0x1c7dee[_0x3e558f(0x439)]()*0.5),this['y']-=_0xf6eb00[_0x3e558f(0x4eb)](this['height']*this[_0x3e558f(0x502)]['y']),this['y']+=this[_0x3e558f(0x2bd)][_0x3e558f(0x668)][_0x3e558f(0x21d)],this[_0x3e558f(0x2a7)]=this[_0x3e558f(0x2bd)]['_erased'],this[_0x3e558f(0x26e)]=this[_0x3e558f(0x2bd)][_0x3e558f(0x3ab)](),this[_0x3e558f(0x4c5)]=this[_0x3e558f(0x2bd)][_0x3e558f(0x397)](),this[_0x3e558f(0x4f0)]=this['_event'][_0x3e558f(0x668)][_0x3e558f(0x301)],this[_0x3e558f(0x4aa)]=this[_0x3e558f(0x2bd)][_0x3e558f(0x668)][_0x3e558f(0x21d)],this[_0x3e558f(0x5eb)]=this[_0x3e558f(0x2bd)][_0x3e558f(0x3a1)],this['_eventErased']&&(this['contentsOpacity']=0x0);}else return this[_0x3e558f(0x187)](0x9,Number(RegExp['$1']));}if(_0xf41edf[_0x3e558f(0x5bf)](/OPACITY:[ ](\d+)([%％])/i)){if('UBEtc'===_0x3e558f(0x5ad)){const _0x39a3a1=Math['round'](Number(RegExp['$1'])/0x64*0xff);return this[_0x3e558f(0x51f)](_0x39a3a1['clamp'](0x0,0xff));}else{const _0x320d8b=/\\SELFVAR\[(\d+)\]/gi;while(_0x583336[_0x3e558f(0x5bf)](_0x320d8b)){_0x387fec=_0x3ede06[_0x3e558f(0x2e6)](_0x320d8b,(_0x3c24ec,_0x319909)=>_0x274869(this['_mapId'],this[_0x3e558f(0x221)],_0x11a57b(_0x319909)));}return _0x23c924;}}if(_0xf41edf[_0x3e558f(0x5bf)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x399e97=this[_0x3e558f(0x46b)]+Math['round'](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x399e97[_0x3e558f(0x505)](0x0,0xff));}if(_0xf41edf['match'](/OPACITY:[ ]([\+\-]\d+)/i)){if('UNYax'!==_0x3e558f(0x34f))_0x1612c0=_0x4fa6f1[_0x3e558f(0x257)](_0x412eb2),_0x51c335[_0x3e558f(0x28b)][_0x3e558f(0x44c)]['call'](this,_0x1c5b2d);else{const _0x116002=this[_0x3e558f(0x46b)]+Number(RegExp['$1']);return this['setOpacity'](_0x116002[_0x3e558f(0x505)](0x0,0xff));}}if(_0xf41edf[_0x3e558f(0x5bf)](/PATTERN LOCK:[ ](\d+)/i))return this[_0x3e558f(0x28c)](Number(RegExp['$1']));if(_0xf41edf[_0x3e558f(0x5bf)](/PATTERN UNLOCK/i))return this[_0x3e558f(0x2f6)]=![];if(_0xf41edf['match'](/POSE:[ ](.*)/i)){if(_0x3e558f(0x2f9)!==_0x3e558f(0x2a8)){const _0x4cfd0e=String(RegExp['$1'])[_0x3e558f(0x4dc)]()[_0x3e558f(0x573)]();return this[_0x3e558f(0x53c)](_0x4cfd0e);}else _0x4f776f[_0x3e558f(0x1bc)](0x1,0x3,0x7,0x9);}if(_0xf41edf[_0x3e558f(0x5bf)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x508529=Number(RegExp['$1']),_0x3bc689=Number(RegExp['$2']);return this[_0x3e558f(0x40c)](_0x508529,_0x3bc689);}if(_0xf41edf[_0x3e558f(0x5bf)](/STEP TOWARD EVENT:[ ](\d+)/i)){if(_0x3e558f(0x5e1)!==_0x3e558f(0x5e1))this[_0x3e558f(0x55f)][_0x3e558f(0x4fa)]=_0x318eac[_0x3e558f(0x533)]('['+_0x199334['$1'][_0x3e558f(0x5bf)](/\d+/g)+']'),this[_0x3e558f(0x55f)][_0x3e558f(0x63b)]=_0x3e558f(0x227);else{const _0x3f6620=$gameMap[_0x3e558f(0x5db)](Number(RegExp['$1']));return this[_0x3e558f(0x487)](_0x3f6620);}}if(_0xf41edf['match'](/STEP TOWARD PLAYER/i))return _0x3e558f(0x1e1)!==_0x3e558f(0x1e1)?_0x40bd73[_0x3e558f(0x402)]:this[_0x3e558f(0x487)]($gamePlayer);if(_0xf41edf[_0x3e558f(0x5bf)](/STEP TOWARD HOME/i)&&this['eventId']){const _0x2eb99a=this['_randomHomeX'],_0x17843b=this[_0x3e558f(0x250)];return this['processMoveRouteStepTo'](_0x2eb99a,_0x17843b);}if(_0xf41edf[_0x3e558f(0x5bf)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x3e558f(0x385)===_0x3e558f(0x385))return this[_0x3e558f(0x1ec)](Number(RegExp['$1']),Number(RegExp['$2']));else{const _0x237e40=['',_0x3e558f(0x359),'QUESTION',_0x3e558f(0x22c),_0x3e558f(0x30c),_0x3e558f(0x552),_0x3e558f(0x20f),_0x3e558f(0x3c3),_0x3e558f(0x47a),_0x3e558f(0x46c),_0x3e558f(0x342),'','','','',''][_0x1e212d];this[_0x3e558f(0x53c)](_0x237e40,_0x29d70b);}}if(_0xf41edf[_0x3e558f(0x5bf)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x245dd2=$gameMap['event'](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0x245dd2);}if(_0xf41edf[_0x3e558f(0x5bf)](/STEP AWAY FROM PLAYER/i))return this[_0x3e558f(0x2a0)]($gamePlayer);if(_0xf41edf['match'](/STEP AWAY FROM HOME/i)&&this[_0x3e558f(0x68d)]){const _0x55b10c=this[_0x3e558f(0x4fd)],_0x4f2e4d=this[_0x3e558f(0x250)];return this['moveAwayFromPoint'](_0x55b10c,_0x4f2e4d);}if(_0xf41edf[_0x3e558f(0x5bf)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x3e558f(0x48b)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0xf41edf[_0x3e558f(0x5bf)](/TURN TO EVENT:[ ](\d+)/i)){const _0x237b7e=$gameMap[_0x3e558f(0x5db)](Number(RegExp['$1']));return this[_0x3e558f(0x3a5)](_0x237b7e);}if(_0xf41edf['match'](/TURN TO PLAYER/i))return this[_0x3e558f(0x3a5)]($gamePlayer);if(_0xf41edf[_0x3e558f(0x5bf)](/TURN TO HOME/i)&&this['eventId']){if('NlDxI'!==_0x3e558f(0x5dd)){const _0xb22dd4=this['_randomHomeX'],_0x2fd046=this[_0x3e558f(0x250)];return this[_0x3e558f(0x48b)](_0xb22dd4,_0x2fd046);}else{const _0x310a52=this[_0x3e558f(0x38c)](this[_0x3e558f(0x5a9)]());return _0xc9fc5e[_0x3e558f(0x5ca)](this['y'],_0x310a52);}}if(_0xf41edf['match'](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x3e558f(0x2cf)==='WpTRX')return this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));else this['_eventIcon']['bufferY']=_0x58722a(_0x5c3e15['$1']);}if(_0xf41edf[_0x3e558f(0x5bf)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){if(_0x3e558f(0x5de)!==_0x3e558f(0x5de))this['_DisablePlayerControl']=![];else{const _0x6f18bd=$gameMap[_0x3e558f(0x5db)](Number(RegExp['$1']));return this[_0x3e558f(0x544)](_0x6f18bd);}}if(_0xf41edf[_0x3e558f(0x5bf)](/TURN AWAY FROM PLAYER/i))return this[_0x3e558f(0x544)]($gamePlayer);if(_0xf41edf[_0x3e558f(0x5bf)](/TURN AWAY FROM HOME/i)&&this[_0x3e558f(0x68d)]){if('cLZHO'!=='cLZHO'){if(_0x1b9fc5>0x0&&_0x4a1f2f<0x0)return 0x9;if(_0x297d0e<0x0&&_0x235ec8<0x0)return 0x7;if(_0x362dfb>0x0&&_0x3f79b2>0x0)return 0x3;if(_0x14c208<0x0&&_0x42a948>0x0)return 0x1;}else{const _0x2567bf=this[_0x3e558f(0x4fd)],_0x5be544=this['_randomHomeY'];return this[_0x3e558f(0x677)](_0x2567bf,_0x5be544);}}if(_0xf41edf[_0x3e558f(0x5bf)](/TURN LOWER LEFT/i))return this[_0x3e558f(0x4e2)](0x1);if(_0xf41edf[_0x3e558f(0x5bf)](/TURN LOWER RIGHT/i)){if('uxZXa'===_0x3e558f(0x1d1))return this[_0x3e558f(0x4e2)](0x3);else _0x5b1ac6['prototype'][_0x3e558f(0x591)][_0x3e558f(0x249)](this),this[_0x3e558f(0x2c3)]['fontSize']=this['defaultFontSize']();}if(_0xf41edf[_0x3e558f(0x5bf)](/TURN UPPER LEFT/i)){if(_0x3e558f(0x62a)!==_0x3e558f(0x62a)){const _0x24a9ed=/\$gameVariables\.value\((\d+)\)/gi,_0x534acf=/\\V\[(\d+)\]/gi;while(_0x37ad02[_0x3e558f(0x5bf)](_0x24a9ed)){_0x1c319b=_0x335e5d[_0x3e558f(0x2e6)](_0x24a9ed,(_0x58b67c,_0x4aa89c)=>_0xa82d67[_0x3e558f(0x5a6)](_0x3f1276(_0x4aa89c)));}while(_0x14ffbe[_0x3e558f(0x5bf)](_0x534acf)){_0x2d7968=_0x17952d['replace'](_0x534acf,(_0x1585d7,_0x414b5a)=>_0x1c06a4[_0x3e558f(0x5a6)](_0x471846(_0x414b5a)));}return _0x19e345;}else return this[_0x3e558f(0x4e2)](0x7);}if(_0xf41edf['match'](/TURN UPPER RIGHT/i))return this['setDirection'](0x9);if(_0xf41edf['match'](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x3e558f(0x24f)](RegExp['$1'],RegExp['$2']);if(_0xf41edf[_0x3e558f(0x5bf)](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x3e558f(0x4cd)](RegExp['$1'],RegExp['$2']);if(_0xf41edf[_0x3e558f(0x5bf)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['processMoveRouteTeleportTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0xf41edf[_0x3e558f(0x5bf)](/TELEPORT TO EVENT:[ ](\d+)/i)){if(_0x3e558f(0x360)!==_0x3e558f(0x671)){const _0xa7fed9=$gameMap[_0x3e558f(0x5db)](Number(RegExp['$1']));return this[_0x3e558f(0x426)](_0xa7fed9);}else return this[_0x3e558f(0x487)](_0x203768);}if(_0xf41edf[_0x3e558f(0x5bf)](/TELEPORT TO PLAYER/i))return this[_0x3e558f(0x426)]($gamePlayer);if(_0xf41edf['match'](/TELEPORT TO HOME/i)&&this[_0x3e558f(0x68d)]){const _0x2e6b1a=this[_0x3e558f(0x4fd)],_0x3196b9=this[_0x3e558f(0x250)];return this[_0x3e558f(0x1ae)](_0x2e6b1a,_0x3196b9);}try{VisuMZ[_0x3e558f(0x28b)]['Game_Character_processMoveCommand']['call'](this,_0x342978);}catch(_0x306d9e){if(_0x3e558f(0x308)!==_0x3e558f(0x308))this[_0x3e558f(0x281)](_0x13f79b[_0x3e558f(0x2b1)],_0x5f3eb7['_eventId']);else{if($gameTemp[_0x3e558f(0x42e)]())console[_0x3e558f(0x312)](_0x306d9e);}}},Game_Character['prototype'][_0x303df0(0x4c6)]=function(_0x3bd611){const _0x32759c=_0x303df0;$gameTemp[_0x32759c(0x479)]([this],_0x3bd611);},Game_Character['prototype']['processMoveRouteBalloon']=function(_0x1b6c54){const _0x11ef29=_0x303df0;let _0x302d55=0x0;switch(_0x1b6c54[_0x11ef29(0x4dc)]()['trim']()){case'!':case _0x11ef29(0x359):_0x302d55=0x1;break;case'?':case _0x11ef29(0x5ee):_0x302d55=0x2;break;case _0x11ef29(0x262):case _0x11ef29(0x38f):case _0x11ef29(0x22c):case _0x11ef29(0x633):case _0x11ef29(0x496):_0x302d55=0x3;break;case _0x11ef29(0x30c):case _0x11ef29(0x4f5):_0x302d55=0x4;break;case _0x11ef29(0x552):_0x302d55=0x5;break;case _0x11ef29(0x20f):_0x302d55=0x6;break;case'COBWEB':case _0x11ef29(0x3fe):case _0x11ef29(0x324):_0x302d55=0x7;break;case _0x11ef29(0x47a):case _0x11ef29(0x410):_0x302d55=0x8;break;case _0x11ef29(0x4de):case _0x11ef29(0x2df):case'LIGHT\x20BULB':case'LIGHT-BULB':case _0x11ef29(0x362):_0x302d55=0x9;break;case'Z':case'ZZ':case'ZZZ':case _0x11ef29(0x64c):_0x302d55=0xa;break;case _0x11ef29(0x441):_0x302d55=0xb;break;case _0x11ef29(0x2c9):_0x302d55=0xc;break;case'USER-DEFINED\x203':_0x302d55=0xd;break;case _0x11ef29(0x54f):_0x302d55=0xe;break;case _0x11ef29(0x42b):_0x302d55=0xf;break;}$gameTemp[_0x11ef29(0x5d4)](this,_0x302d55);},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x50f)]=function(_0x271241){const _0x41492f=_0x303df0;_0x271241+=this[_0x41492f(0x46b)],this[_0x41492f(0x51f)](_0x271241[_0x41492f(0x505)](0x0,0xff));if(this[_0x41492f(0x46b)]<0xff)this[_0x41492f(0x4d5)]--;},Game_Character[_0x303df0(0x2e5)]['processMoveRouteFadeOut']=function(_0xa946c3){const _0x1fcca5=_0x303df0;_0xa946c3=this[_0x1fcca5(0x46b)]-_0xa946c3,this['setOpacity'](_0xa946c3[_0x1fcca5(0x505)](0x0,0xff));if(this[_0x1fcca5(0x46b)]>0x0)this[_0x1fcca5(0x4d5)]--;},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x678)]=function(_0x123ac7){const _0x3425d1=_0x303df0,_0x19d00f=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x31e078=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0xb0446a=this[_0x3425d1(0x5a9)](),_0x38eec1=(_0x123ac7===_0x3425d1(0x42a)?_0x19d00f:_0x31e078)[_0xb0446a],_0x604415=(_0x123ac7===_0x3425d1(0x42a)?_0x31e078:_0x19d00f)[_0xb0446a];if(this[_0x3425d1(0x40f)](this['x'],this['y'],_0x38eec1))_0x3425d1(0x2d4)===_0x3425d1(0x1b2)?this[_0x3425d1(0x209)](_0xd59c90>0x0?0x8:0x2):_0x123ac7===_0x3425d1(0x42a)?this[_0x3425d1(0x4c7)]():this[_0x3425d1(0x5b5)]();else{if(!this[_0x3425d1(0x40f)](this['x'],this['y'],this[_0x3425d1(0x5a9)]())){if(this[_0x3425d1(0x40f)](this['x'],this['y'],_0x604415)){if(_0x3425d1(0x4d4)!==_0x3425d1(0x2af)){if(_0x123ac7===_0x3425d1(0x42a))this[_0x3425d1(0x5b5)]();else{if(_0x3425d1(0x5a8)!=='eRkIt')this[_0x3425d1(0x4c7)]();else return this[_0x3425d1(0x4b8)](_0x146d82);}}else return this[_0x3425d1(0x677)](_0x2a47bc(_0x40961d['$1']),_0x47ea36(_0x46b5d8['$2']));}else{if(_0x3425d1(0x2c8)!==_0x3425d1(0x2c8)){this['_characterSprites']=this['_characterSprites']||[];const _0x31cb0a=new _0xc4f267(_0x2a280f);this['_characterSprites'][_0x3425d1(0x1bc)](_0x31cb0a),this[_0x3425d1(0x56b)]['addChild'](_0x31cb0a),this[_0x3425d1(0x49f)](_0x31cb0a),this[_0x3425d1(0x3af)](_0xf2d172),_0x31cb0a[_0x3425d1(0x3c1)]();}else this[_0x3425d1(0x60f)]();}}}this[_0x3425d1(0x40f)](this['x'],this['y'],this[_0x3425d1(0x5a9)]())&&this[_0x3425d1(0x206)]();},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x315)]=function(_0x5236e0){const _0x1c88fb=_0x303df0;if(ImageManager[_0x1c88fb(0x20b)](this['_characterName']))return;_0x5236e0=_0x5236e0['clamp'](0x0,0x7),this[_0x1c88fb(0x231)](this['_characterName'],_0x5236e0);},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x51c)]=function(_0x2b46aa){const _0x338e92=_0x303df0;switch(this[_0x338e92(0x5a9)]()){case 0x1:this[_0x338e92(0x241)](-_0x2b46aa,_0x2b46aa);break;case 0x2:this['jump'](0x0,_0x2b46aa);break;case 0x3:this[_0x338e92(0x241)](_0x2b46aa,_0x2b46aa);break;case 0x4:this[_0x338e92(0x241)](-_0x2b46aa,0x0);break;case 0x6:this[_0x338e92(0x241)](_0x2b46aa,0x0);break;case 0x7:this[_0x338e92(0x241)](-_0x2b46aa,-_0x2b46aa);break;case 0x8:this[_0x338e92(0x241)](0x0,-_0x2b46aa);break;case 0x9:this[_0x338e92(0x241)](_0x2b46aa,-_0x2b46aa);break;}},Game_Character['prototype']['processMoveRouteJumpTo']=function(_0x2d4317,_0x3ae96c){const _0x18fdc2=_0x303df0,_0x3420a4=Math[_0x18fdc2(0x4eb)](_0x2d4317-this['x']),_0x4d12a7=Math[_0x18fdc2(0x4eb)](_0x3ae96c-this['y']);this[_0x18fdc2(0x241)](_0x3420a4,_0x4d12a7);},Game_Character[_0x303df0(0x2e5)]['processMoveRouteJumpToCharacter']=function(_0x3c5093){const _0x1dceb6=_0x303df0;if(_0x3c5093)this[_0x1dceb6(0x1cb)](_0x3c5093['x'],_0x3c5093['y']);},Game_Character[_0x303df0(0x2e5)]['processMoveRouteStepTo']=function(_0x159987,_0x483981,_0x272df6){const _0x17e282=_0x303df0;let _0x16a4b8=0x0;if(_0x272df6)$gameTemp[_0x17e282(0x326)]=!![];if($gameMap[_0x17e282(0x3e3)]())_0x16a4b8=this[_0x17e282(0x658)](_0x159987,_0x483981);else{if(_0x17e282(0x3b2)==='yjHOZ')_0x16a4b8=this['findDirectionTo'](_0x159987,_0x483981);else{if(!_0x4e3b69[_0x17e282(0x28b)][_0x17e282(0x578)]['Movement'][_0x17e282(0x537)])return;for(const _0x27e5c1 of this[_0x17e282(0x433)]){this['createCharacterShadow'](_0x27e5c1);}}}if(_0x272df6)$gameTemp['_moveAllowPlayerCollision']=![];this[_0x17e282(0x653)](_0x16a4b8),this['setMovementSuccess'](!![]);},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x487)]=function(_0x2be7d5){const _0x50bfaf=_0x303df0;if(_0x2be7d5)this[_0x50bfaf(0x40c)](_0x2be7d5['x'],_0x2be7d5['y']);},Game_Character[_0x303df0(0x2e5)]['processMoveRouteStepFrom']=function(_0x490a75,_0x302758){const _0x1ae6c6=_0x303df0,_0x14808a=this[_0x1ae6c6(0x223)](_0x490a75),_0x2a0f9d=this['deltaYFrom'](_0x302758);},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x5f8)]=function(_0x110e75){const _0x15af06=_0x303df0;if(_0x110e75[_0x15af06(0x5bf)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i)){if(_0x15af06(0x294)==='zbzgs')return!![];else this[_0x15af06(0x3e9)]=this[_0x15af06(0x2bd)][_0x15af06(0x405)](),this[_0x15af06(0x4ca)]();}else{if(_0x110e75[_0x15af06(0x5bf)](/(?:AVOID|EVADE|DODGE)/i)){if(_0x15af06(0x5ce)===_0x15af06(0x5ce))return![];else{if(!_0x2fd308[_0x15af06(0x575)]())return!![];return _0x2efdc4[_0x15af06(0x28b)][_0x15af06(0x279)][_0x15af06(0x249)](this);}}else return![];}},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x469)]=Game_Event['prototype'][_0x303df0(0x2a1)],Game_Event[_0x303df0(0x2e5)][_0x303df0(0x2a1)]=function(_0x2361fe,_0x3b9ee6){const _0x50f11c=_0x303df0;if($gameTemp['_moveAllowPlayerCollision'])return![];return VisuMZ[_0x50f11c(0x28b)][_0x50f11c(0x469)][_0x50f11c(0x249)](this,_0x2361fe,_0x3b9ee6);},Game_Character[_0x303df0(0x2e5)]['processMoveRouteMoveUntilStop']=function(_0x2b6440,_0x1ca073){const _0x3719df=_0x303df0,_0x2dc4ff=['','LOWER\x20LEFT','DOWN',_0x3719df(0x589),_0x3719df(0x35e),'',_0x3719df(0x363),_0x3719df(0x546),'UP','UPPER\x20RIGHT'],_0x264249=_0x2dc4ff['indexOf'](_0x2b6440[_0x3719df(0x4dc)]()[_0x3719df(0x573)]());if(_0x264249<=0x0)return;if(_0x1ca073)$gameTemp[_0x3719df(0x326)]=!![];if(this[_0x3719df(0x40f)](this['x'],this['y'],_0x264249)){if(_0x1ca073)$gameTemp[_0x3719df(0x326)]=![];this[_0x3719df(0x653)](_0x264249),this[_0x3719df(0x4d5)]-=0x1;}if(_0x1ca073)$gameTemp['_moveAllowPlayerCollision']=![];},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x2c4)]=function(_0x7f5a9,_0x486c11,_0x95151d){const _0x1f3945=_0x303df0;this[_0x1f3945(0x40c)](_0x7f5a9,_0x486c11,_0x95151d);if(this['x']!==_0x7f5a9||this['y']!==_0x486c11)this['_moveRouteIndex']--;},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x610)]=function(_0x4311d6,_0x455d32){const _0x10ad18=_0x303df0;if(_0x4311d6)this[_0x10ad18(0x2c4)](_0x4311d6['x'],_0x4311d6['y'],_0x455d32);},Game_Character['prototype'][_0x303df0(0x187)]=function(_0x1b11fa,_0x102119){const _0x5a475f=_0x303df0;_0x102119=_0x102119||0x0;const _0x22ee81={'code':0x1,'indent':null,'parameters':[]};_0x22ee81[_0x5a475f(0x20e)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x1b11fa],this[_0x5a475f(0x5d0)][_0x5a475f(0x341)][this[_0x5a475f(0x4d5)]]['parameters'][0x0]='';while(_0x102119--){if('XZSxX'!==_0x5a475f(0x3ae))this[_0x5a475f(0x5d0)]['list']['splice'](this[_0x5a475f(0x4d5)]+0x1,0x0,_0x22ee81);else{var _0x306f01=this['x']-this[_0x5a475f(0x4e1)][_0x5a475f(0x42a)],_0x581c5b=this['x']+this[_0x5a475f(0x4e1)]['right'],_0x3b674e=this['y']-this[_0x5a475f(0x4e1)]['up'],_0x98be9e=this['y']+this[_0x5a475f(0x4e1)][_0x5a475f(0x286)];return _0x306f01<=_0x363bed&&_0x35faa4<=_0x581c5b&&_0x3b674e<=_0x481513&&_0x3b631f<=_0x98be9e;}}},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x28c)]=function(_0x22fcf1){const _0x182b6d=_0x303df0;this['_patternLocked']=!![],this[_0x182b6d(0x2d8)](_0x22fcf1);},Game_Character['prototype'][_0x303df0(0x24f)]=function(_0x20cde0,_0x591971){const _0x28999c=_0x303df0;if(this===$gamePlayer)return;const _0x3f31fb=[this['_mapId'],this[_0x28999c(0x221)],'A'];_0x20cde0[_0x28999c(0x5bf)](/\b[ABCD]\b/i)?_0x3f31fb[0x2]=String(_0x20cde0)[_0x28999c(0x58d)](0x0)[_0x28999c(0x4dc)]()[_0x28999c(0x573)]():_0x3f31fb[0x2]='Self\x20Switch\x20%1'['format'](_0x20cde0);switch(_0x591971[_0x28999c(0x4dc)]()[_0x28999c(0x573)]()){case'ON':case'TRUE':$gameSelfSwitches['setValue'](_0x3f31fb,!![]);break;case'OFF':case _0x28999c(0x271):$gameSelfSwitches[_0x28999c(0x680)](_0x3f31fb,![]);break;case _0x28999c(0x477):$gameSelfSwitches['setValue'](_0x3f31fb,!$gameSelfSwitches[_0x28999c(0x5a6)](_0x3f31fb));break;}},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x4cd)]=function(_0x258754,_0xd29f07){const _0x304df8=_0x303df0;if(this===$gamePlayer)return;const _0x2799a3=[this['_mapId'],this['_eventId'],_0x304df8(0x18a)[_0x304df8(0x660)](_0x258754)];$gameSelfSwitches['setValue'](_0x2799a3,Number(_0xd29f07));},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x1ae)]=function(_0xb01dc5,_0x1f1fc6){const _0x3f4dc9=_0x303df0;this[_0x3f4dc9(0x415)](_0xb01dc5,_0x1f1fc6);},Game_Character['prototype'][_0x303df0(0x426)]=function(_0xe28db6){const _0x29defa=_0x303df0;if(_0xe28db6)this[_0x29defa(0x1ae)](_0xe28db6['x'],_0xe28db6['y']);},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x5b5)]=function(){const _0x1aa9ae=_0x303df0;switch(this['direction']()){case 0x1:this[_0x1aa9ae(0x4e2)](0x7);break;case 0x2:this[_0x1aa9ae(0x4e2)](0x4);break;case 0x3:this['setDirection'](0x1);break;case 0x4:this[_0x1aa9ae(0x4e2)](0x8);break;case 0x6:this[_0x1aa9ae(0x4e2)](0x2);break;case 0x7:this[_0x1aa9ae(0x4e2)](0x9);break;case 0x8:this['setDirection'](0x6);break;case 0x9:this['setDirection'](0x3);break;}},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x4c7)]=function(){const _0x44374e=_0x303df0;switch(this[_0x44374e(0x5a9)]()){case 0x1:this[_0x44374e(0x4e2)](0x3);break;case 0x2:this['setDirection'](0x6);break;case 0x3:this[_0x44374e(0x4e2)](0x9);break;case 0x4:this[_0x44374e(0x4e2)](0x2);break;case 0x6:this[_0x44374e(0x4e2)](0x8);break;case 0x7:this[_0x44374e(0x4e2)](0x1);break;case 0x8:this['setDirection'](0x4);break;case 0x9:this['setDirection'](0x7);break;}},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x62d)]=function(_0x11ae18,_0x5c5c27,_0x5c55ea){const _0x1bf761=_0x303df0,_0x4fde89=this[_0x1bf761(0x223)](_0x11ae18),_0x279eeb=this['deltaYFrom'](_0x5c5c27);if($gameMap[_0x1bf761(0x3e3)]()){if(_0x5c55ea||this['isSpriteVS8dir']()){if('rFMge'===_0x1bf761(0x202))return _0x294dbb[_0x1bf761(0x607)]&&_0x2fccf6[_0x1bf761(0x53b)][_0x1bf761(0x37c)]('['+_0x1bdf66+']');else{if(_0x4fde89>0x0&&_0x279eeb<0x0)return 0x1;if(_0x4fde89<0x0&&_0x279eeb<0x0)return 0x3;if(_0x4fde89>0x0&&_0x279eeb>0x0)return 0x7;if(_0x4fde89<0x0&&_0x279eeb>0x0)return 0x9;}}}if(Math['abs'](_0x4fde89)>Math[_0x1bf761(0x3f0)](_0x279eeb))return _0x4fde89>0x0?0x4:0x6;else{if(_0x279eeb!==0x0)return _0x279eeb>0x0?0x8:0x2;}return 0x0;},Game_Character['prototype']['getDirectionFromPoint']=function(_0x2f4dd9,_0x5becb5,_0x5683ff){const _0x23b193=_0x303df0,_0x3edc19=this[_0x23b193(0x223)](_0x2f4dd9),_0x470ed7=this[_0x23b193(0x258)](_0x5becb5);if($gameMap['isSupportDiagonalMovement']()){if(_0x5683ff||this[_0x23b193(0x263)]()){if(_0x3edc19>0x0&&_0x470ed7<0x0)return 0x9;if(_0x3edc19<0x0&&_0x470ed7<0x0)return 0x7;if(_0x3edc19>0x0&&_0x470ed7>0x0)return 0x3;if(_0x3edc19<0x0&&_0x470ed7>0x0)return 0x1;}}if(Math[_0x23b193(0x3f0)](_0x3edc19)>Math[_0x23b193(0x3f0)](_0x470ed7)){if('pLLDd'!==_0x23b193(0x454)){_0x2d495f['ConvertParams'](_0xcdf476,_0x3710b4);const _0x8f84c4=_0x272a80['getLastPluginCommandInterpreter'](),_0x3a4167=_0x2f529b[_0x23b193(0x463)]||_0x569c7d[_0x23b193(0x2c6)](),_0x394219=_0x22ea5b[_0x23b193(0x353)]||_0x8f84c4[_0x23b193(0x68d)]();_0x1fcad5[_0x23b193(0x534)](_0x3a4167,_0x394219);}else return _0x3edc19>0x0?0x6:0x4;}else{if(_0x470ed7!==0x0){if(_0x23b193(0x361)===_0x23b193(0x284)){const _0x48b847=_0xff8b77[_0x23b193(0x5d2)](this);if(!_0x48b847)return;const _0x461a20=_0x48b847[_0x23b193(0x488)][_0x23b193(0x4dc)]()[_0x23b193(0x573)]();_0x461a20!==_0x23b193(0x38b)?this[_0x23b193(0x5e7)](_0x461a20,!![]):this[_0x23b193(0x5af)](_0x48b847[_0x23b193(0x2c6)],_0x48b847[_0x23b193(0x68d)],!![]);}else return _0x470ed7>0x0?0x2:0x8;}}return 0x0;},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x48b)]=function(_0x5e3363,_0x3ee94b){const _0x3f266f=_0x303df0,_0x479075=this['getDirectionToPoint'](_0x5e3363,_0x3ee94b,!![]);if(_0x479075)this[_0x3f266f(0x653)](_0x479075);},Game_Character[_0x303df0(0x2e5)]['moveAwayFromPoint']=function(_0x5c9e11,_0x9cf9f2){const _0x2a883c=_0x303df0,_0xf1fe2b=this['getDirectionFromPoint'](_0x5c9e11,_0x9cf9f2,!![]);if(_0xf1fe2b)this[_0x2a883c(0x653)](_0xf1fe2b);},Game_Character[_0x303df0(0x2e5)]['turnTowardPoint']=function(_0x4cf02e,_0x1d6d8f){const _0x3d4c4=_0x303df0,_0x270f46=this[_0x3d4c4(0x62d)](_0x4cf02e,_0x1d6d8f,![]);if(_0x270f46)this[_0x3d4c4(0x4e2)](_0x270f46);},Game_Character['prototype']['turnAwayFromPoint']=function(_0x34b1c5,_0x3590db){const _0x530ccd=_0x303df0,_0x144667=this[_0x530ccd(0x5a1)](_0x34b1c5,_0x3590db,![]);if(_0x144667)this[_0x530ccd(0x4e2)](_0x144667);},Game_Character[_0x303df0(0x2e5)]['moveTowardCharacter']=function(_0x2e7910){const _0x5a1e50=_0x303df0;if(_0x2e7910)this[_0x5a1e50(0x48b)](_0x2e7910['x'],_0x2e7910['y']);},Game_Character[_0x303df0(0x2e5)]['moveAwayFromCharacter']=function(_0x2a6fa5){const _0x46317a=_0x303df0;if(_0x2a6fa5)this[_0x46317a(0x1ec)](_0x2a6fa5['x'],_0x2a6fa5['y']);},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x3a5)]=function(_0x3a5eaa){if(_0x3a5eaa)this['turnTowardPoint'](_0x3a5eaa['x'],_0x3a5eaa['y']);},Game_Character[_0x303df0(0x2e5)][_0x303df0(0x544)]=function(_0x7809ed){if(_0x7809ed)this['turnAwayFromPoint'](_0x7809ed['x'],_0x7809ed['y']);},VisuMZ['EventsMoveCore']['Game_Player_isDashing']=Game_Player[_0x303df0(0x2e5)][_0x303df0(0x225)],Game_Player[_0x303df0(0x2e5)][_0x303df0(0x225)]=function(){const _0x3ae5f3=_0x303df0;if(this[_0x3ae5f3(0x440)])return!![];return VisuMZ['EventsMoveCore'][_0x3ae5f3(0x23e)][_0x3ae5f3(0x249)](this);},VisuMZ[_0x303df0(0x28b)]['Game_Player_getInputDirection']=Game_Player['prototype'][_0x303df0(0x2cb)],Game_Player['prototype']['getInputDirection']=function(){const _0x4a5755=_0x303df0;return $gameMap['isSupportDiagonalMovement']()?this['getInputDir8']():VisuMZ['EventsMoveCore'][_0x4a5755(0x47c)]['call'](this);},Game_Player['prototype'][_0x303df0(0x28e)]=function(){const _0x41da13=_0x303df0;return Input[_0x41da13(0x402)];},Game_Player['prototype']['moveByInput']=function(){const _0x5b9fe8=_0x303df0;if($gameSystem[_0x5b9fe8(0x681)]())return 0x0;if(!this[_0x5b9fe8(0x20d)]()&&this[_0x5b9fe8(0x35f)]()){let _0x5bb026=this['getInputDirection']();if(_0x5bb026>0x0)_0x5b9fe8(0x3fc)!==_0x5b9fe8(0x1d6)?$gameTemp['clearDestination']():this[_0x5b9fe8(0x2a5)]();else{if($gameTemp[_0x5b9fe8(0x229)]()){const _0x192ba6=$gameTemp[_0x5b9fe8(0x4e0)](),_0x5706a2=$gameTemp['destinationY'](),_0x26af0e=$gameMap[_0x5b9fe8(0x3e3)](),_0x335143=$gameMap[_0x5b9fe8(0x186)](_0x192ba6,_0x5706a2),_0x460ce8=$gameMap[_0x5b9fe8(0x3cf)](_0x192ba6,_0x5706a2)[_0x5b9fe8(0x21b)]<=0x0;if(_0x26af0e&&_0x335143&&_0x460ce8)'UJEex'!==_0x5b9fe8(0x21c)?this[_0x5b9fe8(0x1db)]():_0x5bb026=this[_0x5b9fe8(0x658)](_0x192ba6,_0x5706a2);else{if(_0x5b9fe8(0x56e)!==_0x5b9fe8(0x56e))return![];else _0x5bb026=this[_0x5b9fe8(0x27b)](_0x192ba6,_0x5706a2);}}}if(_0x5bb026>0x0){if('NtZNk'!=='NtZNk')return this[_0x5b9fe8(0x4e2)](0x3);else this['_inputTime']=this[_0x5b9fe8(0x45a)]||0x0,this['isTurnInPlace']()?this['setDirection'](_0x5bb026):this[_0x5b9fe8(0x1d8)](_0x5bb026),this[_0x5b9fe8(0x45a)]++;}else _0x5b9fe8(0x272)===_0x5b9fe8(0x2d5)?_0x514b6c['setCommonEvent'](0x0):this[_0x5b9fe8(0x45a)]=0x0;}},Game_Player['prototype']['isTurnInPlace']=function(){const _0x3cbeb5=_0x303df0,_0x17259a=VisuMZ[_0x3cbeb5(0x28b)]['Settings'][_0x3cbeb5(0x3bf)];if(!_0x17259a['EnableTurnInPlace'])return![];if($gameTemp['isDestinationValid']())return![];if(this['isDashing']()||this[_0x3cbeb5(0x20d)]()||this['isOnLadder']())return![];return this[_0x3cbeb5(0x45a)]<_0x17259a['TurnInPlaceDelay'];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x3f1)]=Game_Player[_0x303df0(0x2e5)][_0x303df0(0x1d8)],Game_Player['prototype'][_0x303df0(0x1d8)]=function(_0x1ef9f6){const _0x1b5588=_0x303df0;if($gameMap[_0x1b5588(0x3e3)]()){if(_0x1b5588(0x5c7)!==_0x1b5588(0x5c7)){const _0x550472=_0x475eb2[_0x1b5588(0x203)][_0x46264b];_0x550472&&(_0xdc69be[_0x1b5588(0x2c6)]=_0x550472['MapID'],_0x48df34[_0x1b5588(0x68d)]=_0x550472['EventID']);}else this[_0x1b5588(0x653)](_0x1ef9f6);}else{if('SZWMb'!=='SZWMb'){if(_0x591128)return _0x14a576;}else VisuMZ[_0x1b5588(0x28b)][_0x1b5588(0x3f1)][_0x1b5588(0x249)](this,_0x1ef9f6);}},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x367)]=Game_Player[_0x303df0(0x2e5)][_0x303df0(0x64d)],Game_Player[_0x303df0(0x2e5)]['isMapPassable']=function(_0xb63363,_0x363eac,_0x14d85e){const _0x56c8bb=_0x303df0;if($gameMap['isRegionAllowPass'](_0xb63363,_0x363eac,_0x14d85e,_0x56c8bb(0x1dc))){if(_0x56c8bb(0x2fc)===_0x56c8bb(0x2fc)){if(this[_0x56c8bb(0x36f)]()&&this[_0x56c8bb(0x3db)]())return this[_0x56c8bb(0x3db)]()[_0x56c8bb(0x64d)](_0xb63363,_0x363eac,_0x14d85e);else{if(_0x56c8bb(0x2b7)===_0x56c8bb(0x2c0)){this[_0x56c8bb(0x412)]=this[_0x56c8bb(0x412)]||0x0;if(this['_poseDuration']>0x0){this[_0x56c8bb(0x412)]--;if(this[_0x56c8bb(0x412)]<=0x0&&this[_0x56c8bb(0x674)]!==_0x56c8bb(0x342))this['clearPose']();}}else return!![];}}else _0x2be7ec['CPC'][_0x56c8bb(0x1bc)](_0x1ad827);}if($gameMap['isRegionForbidPass'](_0xb63363,_0x363eac,_0x14d85e,_0x56c8bb(0x1dc)))return![];return VisuMZ[_0x56c8bb(0x28b)][_0x56c8bb(0x367)][_0x56c8bb(0x249)](this,_0xb63363,_0x363eac,_0x14d85e);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x2e8)]=Game_Player[_0x303df0(0x2e5)][_0x303df0(0x34c)],Game_Player[_0x303df0(0x2e5)][_0x303df0(0x34c)]=function(_0x4d8762){const _0x4ba207=_0x303df0;VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerHere']['call'](this,_0x4d8762);if(this[_0x4ba207(0x5e9)]()){if(_0x4ba207(0x23f)!==_0x4ba207(0x3e6)){this[_0x4ba207(0x47d)](_0x4d8762);if(_0x4d8762[_0x4ba207(0x37c)](0x0)&&this[_0x4ba207(0x2aa)]()===_0x4ba207(0x306))this[_0x4ba207(0x59f)](this['x'],this['y']);else(_0x4d8762[_0x4ba207(0x37c)](0x1)||_0x4d8762[_0x4ba207(0x37c)](0x2))&&this[_0x4ba207(0x4a9)]();}else{const _0x44522d=_0x3c7bf0(_0x13fb37['$1'])[_0x4ba207(0x4dc)]()[_0x4ba207(0x573)]();return this[_0x4ba207(0x53c)](_0x44522d);}}},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x38d)]=Game_Player['prototype'][_0x303df0(0x499)],Game_Player[_0x303df0(0x2e5)][_0x303df0(0x499)]=function(_0x5b68c9){const _0x443bdb=_0x303df0;VisuMZ['EventsMoveCore'][_0x443bdb(0x38d)]['call'](this,_0x5b68c9);if(this['canStartLocalEvents']()&&_0x5b68c9[_0x443bdb(0x37c)](0x0)&&this[_0x443bdb(0x2aa)]()===_0x443bdb(0x39d)){const _0x3e972d=this[_0x443bdb(0x5a9)](),_0x249fc7=$gameMap['roundXWithDirection'](this['x'],_0x3e972d),_0x36081d=$gameMap[_0x443bdb(0x5ca)](this['y'],_0x3e972d);this[_0x443bdb(0x59f)](_0x249fc7,_0x36081d);}},Game_Player[_0x303df0(0x2e5)][_0x303df0(0x47d)]=function(_0x31d938){const _0x56a69d=_0x303df0;if($gameMap[_0x56a69d(0x5c9)]())return;if($gameMap[_0x56a69d(0x56c)]())return;const _0x404cad=$gameMap[_0x56a69d(0x659)]();for(const _0x7fb296 of _0x404cad){if(_0x56a69d(0x300)===_0x56a69d(0x300)){if(!_0x7fb296)continue;if(!_0x7fb296[_0x56a69d(0x51e)](_0x31d938))continue;if(this['meetActivationRegionConditions'](_0x7fb296))return _0x7fb296['start']();if(this['meetActivationProximityConditions'](_0x7fb296))return _0x7fb296['start']();}else return this[_0x56a69d(0x31b)][_0x56a69d(0x468)];}},Game_Player['prototype'][_0x303df0(0x30b)]=function(_0x339eb1){const _0x1eabcc=_0x303df0;if($gameMap[_0x1eabcc(0x5c9)]())return![];if($gameMap[_0x1eabcc(0x56c)]())return![];return _0x339eb1[_0x1eabcc(0x280)]()[_0x1eabcc(0x37c)](this[_0x1eabcc(0x389)]());},Game_Player[_0x303df0(0x2e5)][_0x303df0(0x616)]=function(_0x3e49f0){const _0xbe781b=_0x303df0;if($gameMap[_0xbe781b(0x5c9)]())return![];if($gameMap[_0xbe781b(0x56c)]())return![];if(['none',_0xbe781b(0x227)][_0xbe781b(0x37c)](_0x3e49f0['activationProximityType']()))return![];const _0x183897=_0x3e49f0[_0xbe781b(0x686)](),_0x385158=_0x3e49f0[_0xbe781b(0x2b5)]();switch(_0x183897){case _0xbe781b(0x3df):const _0x1bb487=$gameMap[_0xbe781b(0x561)](this['x'],this['y'],_0x3e49f0['x'],_0x3e49f0['y']);return _0x3e49f0['activationProximityDistance']()>=_0x1bb487;break;case _0xbe781b(0x18f):return _0x385158>=Math[_0xbe781b(0x3f0)](_0x3e49f0['deltaXFrom'](this['x']))&&_0x385158>=Math[_0xbe781b(0x3f0)](_0x3e49f0[_0xbe781b(0x258)](this['y']));break;case _0xbe781b(0x570):return _0x385158>=Math[_0xbe781b(0x3f0)](_0x3e49f0[_0xbe781b(0x258)](this['y']));break;case _0xbe781b(0x5ab):return _0x385158>=Math['abs'](_0x3e49f0[_0xbe781b(0x223)](this['x']));break;case _0xbe781b(0x3ff):return![];break;}},Game_Player[_0x303df0(0x2e5)]['startMapCommonEventOnOK']=function(_0x515397,_0x292423){const _0x5c1128=_0x303df0;if($gameMap[_0x5c1128(0x5c9)]())return;if($gameMap[_0x5c1128(0x56c)]())return;let _0x516a62=VisuMZ[_0x5c1128(0x28b)]['Settings'][_0x5c1128(0x5b8)],_0x3ea1b9=$gameMap[_0x5c1128(0x389)](_0x515397,_0x292423);const _0x12b6b3=_0x5c1128(0x188)[_0x5c1128(0x660)](_0x3ea1b9);if(_0x516a62[_0x12b6b3]){if(_0x5c1128(0x566)!=='ttgUE')return this[_0x5c1128(0x25f)]=![],![];else $gameTemp[_0x5c1128(0x4c8)](_0x516a62[_0x12b6b3]);}},Game_Player[_0x303df0(0x2e5)][_0x303df0(0x2aa)]=function(){const _0x525e89=_0x303df0;return VisuMZ[_0x525e89(0x28b)][_0x525e89(0x578)][_0x525e89(0x2e7)];},Game_Player[_0x303df0(0x2e5)][_0x303df0(0x4a9)]=function(){const _0x5ca402=_0x303df0;if($gameMap['isEventRunning']())return;if($gameMap[_0x5ca402(0x56c)]())return;let _0x34781d=VisuMZ[_0x5ca402(0x28b)]['Settings'][_0x5ca402(0x377)];const _0x3ecc66=_0x5ca402(0x188)[_0x5ca402(0x660)](this[_0x5ca402(0x389)]());_0x34781d[_0x3ecc66]&&$gameTemp[_0x5ca402(0x4c8)](_0x34781d[_0x3ecc66]);},VisuMZ['EventsMoveCore'][_0x303df0(0x1dd)]=Game_Player[_0x303df0(0x2e5)]['increaseSteps'],Game_Player['prototype'][_0x303df0(0x49d)]=function(){const _0x810709=_0x303df0;VisuMZ['EventsMoveCore']['Game_Player_increaseSteps']['call'](this),VisuMZ[_0x810709(0x483)](0x0);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x378)]=Game_Follower[_0x303df0(0x2e5)][_0x303df0(0x1ff)],Game_Follower['prototype'][_0x303df0(0x1ff)]=function(_0x2ec521){const _0x23f5d4=_0x303df0;VisuMZ['EventsMoveCore'][_0x23f5d4(0x378)][_0x23f5d4(0x249)](this,_0x2ec521),this[_0x23f5d4(0x2e4)]=![];},Game_Follower['prototype']['isDashing']=function(){const _0x5ba1d2=_0x303df0;return $gamePlayer[_0x5ba1d2(0x225)]();},Game_Follower[_0x303df0(0x2e5)][_0x303df0(0x327)]=function(){return $gamePlayer['isDashingAndMoving']();},Game_Follower[_0x303df0(0x2e5)]['realMoveSpeed']=function(){const _0x3903d0=_0x303df0;return $gamePlayer[_0x3903d0(0x61a)]();},Game_Follower[_0x303df0(0x2e5)]['setChaseOff']=function(_0x45cd81){const _0x5521d6=_0x303df0;this[_0x5521d6(0x2e4)]=_0x45cd81;},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x66f)]=Game_Follower[_0x303df0(0x2e5)]['chaseCharacter'],Game_Follower[_0x303df0(0x2e5)][_0x303df0(0x2f3)]=function(_0x64429){const _0x25dcfb=_0x303df0;if(this[_0x25dcfb(0x2e4)])return;if($gameSystem[_0x25dcfb(0x2a3)]())return;VisuMZ[_0x25dcfb(0x28b)][_0x25dcfb(0x66f)][_0x25dcfb(0x249)](this,_0x64429);},VisuMZ['EventsMoveCore'][_0x303df0(0x54b)]=Game_Vehicle['prototype'][_0x303df0(0x64d)],Game_Vehicle[_0x303df0(0x2e5)]['isMapPassable']=function(_0x546d5e,_0x254ca4,_0x297954){const _0x317785=_0x303df0;if($gameMap['isRegionAllowPass'](_0x546d5e,_0x254ca4,_0x297954,this[_0x317785(0x58a)]))return!![];if($gameMap[_0x317785(0x61b)](_0x546d5e,_0x254ca4,_0x297954,this[_0x317785(0x58a)]))return![];return VisuMZ['EventsMoveCore'][_0x317785(0x54b)][_0x317785(0x249)](this,_0x546d5e,_0x254ca4,_0x297954);},Game_Vehicle['prototype'][_0x303df0(0x5c2)]=function(_0xd98336,_0x4160d9,_0xc0ac90){const _0x1f5768=_0x303df0;if($gameMap['isRegionAllowPass'](_0xd98336,_0x4160d9,_0xc0ac90,this['_type']))return!![];if($gameMap['isRegionForbidPass'](_0xd98336,_0x4160d9,_0xc0ac90,this[_0x1f5768(0x58a)]))return![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_canPass'][_0x1f5768(0x249)]($gamePlayer,_0xd98336,_0x4160d9,_0xc0ac90);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x380)]=Game_Vehicle[_0x303df0(0x2e5)][_0x303df0(0x60d)],Game_Vehicle[_0x303df0(0x2e5)][_0x303df0(0x60d)]=function(_0x4c81c4,_0x283592,_0x35de64){const _0xe7866=_0x303df0;if($gameMap['isRegionDockable'](_0x4c81c4,_0x283592,_0x35de64,this[_0xe7866(0x58a)]))return!![];const _0x459978=this[_0xe7866(0x58a)][_0xe7866(0x58d)](0x0)[_0xe7866(0x4dc)]()+this['_type'][_0xe7866(0x355)](0x1),_0x3b7d63=_0xe7866(0x18d)[_0xe7866(0x660)](_0x459978);if(VisuMZ['EventsMoveCore'][_0xe7866(0x578)][_0xe7866(0x418)][_0x3b7d63]){if(_0xe7866(0x200)!=='JERnQ'){this[_0xe7866(0x29f)]=!![];return;}else return![];}else return VisuMZ[_0xe7866(0x28b)][_0xe7866(0x380)]['call'](this,_0x4c81c4,_0x283592,_0x35de64);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x613)]=Game_Vehicle['prototype'][_0x303df0(0x2f4)],Game_Vehicle[_0x303df0(0x2e5)][_0x303df0(0x2f4)]=function(){const _0x4ee4f2=_0x303df0;VisuMZ[_0x4ee4f2(0x28b)][_0x4ee4f2(0x613)][_0x4ee4f2(0x249)](this);const _0xe4fbe=VisuMZ[_0x4ee4f2(0x28b)][_0x4ee4f2(0x578)][_0x4ee4f2(0x3bf)];if(this['isBoat']()){if(_0xe4fbe['BoatSpeed'])this[_0x4ee4f2(0x1ac)](_0xe4fbe['BoatSpeed']);}else{if(this[_0x4ee4f2(0x31a)]()){if(_0xe4fbe[_0x4ee4f2(0x183)])this[_0x4ee4f2(0x1ac)](_0xe4fbe[_0x4ee4f2(0x183)]);}else{if(this[_0x4ee4f2(0x396)]()){if(_0xe4fbe[_0x4ee4f2(0x679)])this['setMoveSpeed'](_0xe4fbe[_0x4ee4f2(0x679)]);}}}},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x374)]=Game_Event[_0x303df0(0x2e5)]['initialize'],Game_Event['prototype'][_0x303df0(0x1ff)]=function(_0x5b307f,_0x4b3720){const _0x4e0efb=_0x303df0;VisuMZ['EventsMoveCore']['Game_Event_initialize'][_0x4e0efb(0x249)](this,_0x5b307f,_0x4b3720),this[_0x4e0efb(0x56f)](),this[_0x4e0efb(0x293)](),this[_0x4e0efb(0x2ca)]();},Game_Map[_0x303df0(0x2e5)][_0x303df0(0x4a7)]=function(_0x5ba9de,_0x2540d2){const _0x4bf677=_0x303df0;if(_0x5ba9de===$gameMap['mapId']())return $dataMap['events'][_0x2540d2];else{if('obYDh'===_0x4bf677(0x5b4))return VisuMZ[_0x4bf677(0x372)][_0x5ba9de][_0x4bf677(0x659)][_0x2540d2];else this[_0x4bf677(0x4c7)]();}},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x400)]=Game_Event['prototype'][_0x303df0(0x5db)],Game_Event[_0x303df0(0x2e5)][_0x303df0(0x5db)]=function(){const _0x4a35cc=_0x303df0;if(this[_0x4a35cc(0x197)]!==undefined){if(_0x4a35cc(0x56a)!=='LceRu'){const _0x1e721e=this[_0x4a35cc(0x197)][_0x4a35cc(0x2c6)],_0x4fca64=this['_eventMorphData'][_0x4a35cc(0x68d)];return $gameMap['referEvent'](_0x1e721e,_0x4fca64);}else{_0x3a1204=this[_0x4a35cc(0x46b)]-_0x6ca583,this['setOpacity'](_0xa077d4[_0x4a35cc(0x505)](0x0,0xff));if(this[_0x4a35cc(0x46b)]>0x0)this[_0x4a35cc(0x4d5)]--;}}if(this[_0x4a35cc(0x521)]!==undefined){const _0x4b436f=this['_eventCopyData']['mapId'],_0x539ceb=this[_0x4a35cc(0x521)]['eventId'];return $gameMap['referEvent'](_0x4b436f,_0x539ceb);}if(this[_0x4a35cc(0x5c0)]!==undefined){const _0x8fe2cf=this[_0x4a35cc(0x5c0)][_0x4a35cc(0x2c6)],_0x5c48b6=this[_0x4a35cc(0x5c0)]['eventId'];return $gameMap[_0x4a35cc(0x4a7)](_0x8fe2cf,_0x5c48b6);}if($gameTemp[_0x4a35cc(0x1b9)]!==undefined){const _0x2842f5=$gameTemp[_0x4a35cc(0x1b9)][_0x4a35cc(0x2c6)],_0x1ca034=$gameTemp[_0x4a35cc(0x1b9)][_0x4a35cc(0x68d)];return $gameMap[_0x4a35cc(0x4a7)](_0x2842f5,_0x1ca034);}return VisuMZ[_0x4a35cc(0x28b)][_0x4a35cc(0x400)][_0x4a35cc(0x249)](this);},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x25e)]=function(_0x6edbf7,_0xc9d04c){const _0x37b184=_0x303df0;if(_0x6edbf7===0x0||_0xc9d04c===0x0)return![];if(!VisuMZ[_0x37b184(0x372)][_0x6edbf7]&&_0x6edbf7!==$gameMap[_0x37b184(0x2c6)]()){if('XFOBv'!==_0x37b184(0x652))this[_0x37b184(0x2b9)]=!![];else return $gameTemp[_0x37b184(0x42e)]()&&console['log'](_0x37b184(0x30f)[_0x37b184(0x660)](_0x6edbf7)),![];}return!![];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x2d2)]=Game_Event[_0x303df0(0x2e5)]['start'],Game_Event[_0x303df0(0x2e5)][_0x303df0(0x2ee)]=function(){const _0x5246d8=_0x303df0;VisuMZ['EventsMoveCore'][_0x5246d8(0x2d2)][_0x5246d8(0x249)](this);if(Imported['VisuMZ_1_MessageCore']&&Input['isPressed'](VisuMZ['MessageCore'][_0x5246d8(0x578)][_0x5246d8(0x3b0)][_0x5246d8(0x466)])){if(_0x5246d8(0x41e)!==_0x5246d8(0x41e))return _0x42a14f['EventsMoveCore']['CustomPageConditions'][_0x5246d8(0x512)][_0x5246d8(0x37c)](this[_0x5246d8(0x222)]);else Input[_0x5246d8(0x545)]();}},Game_Event[_0x303df0(0x2e5)]['setupCopyEvent']=function(){const _0x15101b=_0x303df0,_0x2e7946=this['event']()[_0x15101b(0x5bd)];if(_0x2e7946==='')return;if(DataManager['isBattleTest']()||DataManager['isEventTest']())return;const _0x4ea1aa=VisuMZ[_0x15101b(0x28b)]['Settings'][_0x15101b(0x4a3)];let _0x35d1d7=null,_0x5f5d08=0x0,_0x549da0=0x0;if(_0x2e7946[_0x15101b(0x5bf)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x5f5d08=Number(RegExp['$1']),_0x549da0=Number(RegExp['$2']);else{if(_0x2e7946[_0x15101b(0x5bf)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){if(_0x15101b(0x317)===_0x15101b(0x317))_0x5f5d08=Number(RegExp['$1']),_0x549da0=Number(RegExp['$2']);else return this[_0x15101b(0x263)]()&&_0x150b20['EventsMoveCore'][_0x15101b(0x578)][_0x15101b(0x1fd)][_0x15101b(0x314)];}else{if(_0x2e7946[_0x15101b(0x5bf)](/<COPY EVENT:[ ](.*?)>/i)){if('DzbAT'!==_0x15101b(0x49e)){const _0xb31767=String(RegExp['$1'])['toUpperCase']()[_0x15101b(0x573)]();_0x35d1d7=VisuMZ['EventTemplates'][_0xb31767];if(!_0x35d1d7)return;_0x5f5d08=_0x35d1d7[_0x15101b(0x4d9)],_0x549da0=_0x35d1d7['EventID'];}else{if(!this[_0x15101b(0x538)])return;this[_0x15101b(0x538)]['smooth']=!!_0x245465[_0x15101b(0x28b)]['Settings']['Movement']['BitmapSmoothing'];}}}}if(!this['checkValidEventerMap'](_0x5f5d08,_0x549da0))return;_0x4ea1aa['PreCopyJS']['call'](this,_0x5f5d08,_0x549da0,this);if(_0x35d1d7)_0x35d1d7['PreCopyJS'][_0x15101b(0x249)](this,_0x5f5d08,_0x549da0,this);this['_eventCopyData']={'mapId':_0x5f5d08,'eventId':_0x549da0},this[_0x15101b(0x3a1)]=-0x2,this[_0x15101b(0x4ca)](),_0x4ea1aa['PostCopyJS'][_0x15101b(0x249)](this,_0x5f5d08,_0x549da0,this);if(_0x35d1d7)_0x35d1d7[_0x15101b(0x4a2)][_0x15101b(0x249)](this,_0x5f5d08,_0x549da0,this);$gameMap[_0x15101b(0x629)]();},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x293)]=function(){const _0x427dc3=_0x303df0,_0x195423=$gameSystem[_0x427dc3(0x5d2)](this);if(!_0x195423)return;const _0x55563b=_0x195423[_0x427dc3(0x488)][_0x427dc3(0x4dc)]()[_0x427dc3(0x573)]();_0x55563b!==_0x427dc3(0x38b)?this[_0x427dc3(0x5e7)](_0x55563b,!![]):this[_0x427dc3(0x5af)](_0x195423[_0x427dc3(0x2c6)],_0x195423[_0x427dc3(0x68d)],!![]);},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x5af)]=function(_0x509948,_0x788bf8,_0x461fc7){const _0x4a02cb=_0x303df0;if(!this[_0x4a02cb(0x25e)](_0x509948,_0x788bf8))return;const _0x2feaa4=VisuMZ['EventsMoveCore']['Settings'][_0x4a02cb(0x4a3)];if(!_0x461fc7)_0x2feaa4[_0x4a02cb(0x219)][_0x4a02cb(0x249)](this,_0x509948,_0x788bf8,this);this[_0x4a02cb(0x197)]={'mapId':_0x509948,'eventId':_0x788bf8},this[_0x4a02cb(0x3a1)]=-0x2,this['refresh']();if(!_0x461fc7)_0x2feaa4[_0x4a02cb(0x438)][_0x4a02cb(0x249)](this,_0x509948,_0x788bf8,this);$gameMap[_0x4a02cb(0x629)]();},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x5e7)]=function(_0x3764e0,_0xac0f43){const _0x2510d3=_0x303df0;_0x3764e0=_0x3764e0['toUpperCase']()['trim']();const _0x18e248=VisuMZ['EventTemplates'][_0x3764e0];if(!_0x18e248)return;const _0x1af918=_0x18e248[_0x2510d3(0x4d9)],_0x5b62ad=_0x18e248['EventID'];if(!this[_0x2510d3(0x25e)](_0x1af918,_0x5b62ad))return;if(!_0xac0f43)_0x18e248[_0x2510d3(0x219)]['call'](this,_0x1af918,_0x5b62ad,this);this[_0x2510d3(0x5af)](_0x1af918,_0x5b62ad,_0xac0f43);if(!_0xac0f43)_0x18e248['PostMorphJS'][_0x2510d3(0x249)](this,_0x1af918,_0x5b62ad,this);if($gameMap)$gameMap[_0x2510d3(0x629)]();},Game_Event['prototype'][_0x303df0(0x1a9)]=function(){const _0x587d50=_0x303df0;this[_0x587d50(0x197)]=undefined,this[_0x587d50(0x3a1)]=-0x2,this[_0x587d50(0x4ca)]();},Game_Event[_0x303df0(0x2e5)]['setupSpawn']=function(_0x53abf8){const _0x55d45a=_0x303df0,_0x230516=VisuMZ[_0x55d45a(0x28b)][_0x55d45a(0x578)][_0x55d45a(0x4a3)],_0x1ddc03=_0x53abf8[_0x55d45a(0x488)][_0x55d45a(0x4dc)]()[_0x55d45a(0x573)](),_0xfe91d5=!['',_0x55d45a(0x38b)][_0x55d45a(0x37c)](_0x1ddc03);let _0x904303=0x0,_0x48f77d=0x0;if(_0xfe91d5){const _0xdbcc22=VisuMZ[_0x55d45a(0x203)][_0x1ddc03];if(!_0xdbcc22)return;_0x904303=_0xdbcc22[_0x55d45a(0x4d9)],_0x48f77d=_0xdbcc22['EventID'];}else _0x904303=_0x53abf8[_0x55d45a(0x2c6)],_0x48f77d=_0x53abf8[_0x55d45a(0x68d)];if(!this['checkValidEventerMap'](_0x904303,_0x48f77d))return;if(_0xfe91d5){const _0x282754=VisuMZ[_0x55d45a(0x203)][_0x1ddc03];_0x282754['PreSpawnJS'][_0x55d45a(0x249)](this,_0x904303,_0x48f77d,this);}_0x230516[_0x55d45a(0x39f)]['call'](this,_0x904303,_0x48f77d,this),this[_0x55d45a(0x5c0)]=_0x53abf8,this[_0x55d45a(0x3a1)]=-0x2,this[_0x55d45a(0x2b1)]=$gameMap[_0x55d45a(0x2c6)](),this[_0x55d45a(0x221)]=_0x53abf8[_0x55d45a(0x643)],this[_0x55d45a(0x4ef)]=_0x53abf8['spawnPreserved'],this[_0x55d45a(0x415)](_0x53abf8['x'],_0x53abf8['y']),this[_0x55d45a(0x4e2)](_0x53abf8[_0x55d45a(0x5a9)]),this[_0x55d45a(0x4ca)]();if(_0xfe91d5){const _0x4b35da=VisuMZ[_0x55d45a(0x203)][_0x1ddc03];if(!_0x4b35da)return;_0x4b35da[_0x55d45a(0x432)][_0x55d45a(0x249)](this,_0x904303,_0x48f77d,this);}_0x230516[_0x55d45a(0x432)][_0x55d45a(0x249)](this,_0x904303,_0x48f77d,this);const _0x73b6c4=SceneManager[_0x55d45a(0x53a)];if(_0x73b6c4&&_0x73b6c4[_0x55d45a(0x295)])_0x73b6c4[_0x55d45a(0x295)][_0x55d45a(0x4f8)](this);},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x5e2)]=function(){const _0x281b62=_0x303df0;return!!this[_0x281b62(0x5c0)];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x517)]=Game_Event['prototype'][_0x303df0(0x5a0)],Game_Event[_0x303df0(0x2e5)][_0x303df0(0x5a0)]=function(){const _0x269849=_0x303df0;VisuMZ[_0x269849(0x28b)][_0x269849(0x517)][_0x269849(0x249)](this),this[_0x269849(0x5f0)]();},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x2f1)]=Game_Event[_0x303df0(0x2e5)]['setupPageSettings'],Game_Event['prototype']['setupPageSettings']=function(){const _0x41f615=_0x303df0;this[_0x41f615(0x52e)]=!![],VisuMZ[_0x41f615(0x28b)][_0x41f615(0x2f1)][_0x41f615(0x249)](this),this[_0x41f615(0x47e)](),this[_0x41f615(0x52e)]=![];},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x47e)]=function(){const _0x8d3565=_0x303df0;if(!this['event']())return;this['initEventsMoveCoreEffects'](),this[_0x8d3565(0x3d8)](),this[_0x8d3565(0x24d)](),this[_0x8d3565(0x436)]();},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x3d8)]=function(){const _0x3437a6=_0x303df0,_0x25a233=this[_0x3437a6(0x5db)]()['note'];if(_0x25a233==='')return;this[_0x3437a6(0x30e)](_0x25a233);},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x24d)]=function(){const _0x30337e=_0x303df0;if(!this[_0x30337e(0x4b6)]())return;const _0x4190ab=this['list']();let _0x1c38a0='';for(const _0x5056a3 of _0x4190ab){if(_0x30337e(0x3c8)===_0x30337e(0x3c8)){if([0x6c,0x198][_0x30337e(0x37c)](_0x5056a3['code'])){if(_0x1c38a0!=='')_0x1c38a0+='\x0a';_0x1c38a0+=_0x5056a3[_0x30337e(0x3c4)][0x0];}}else{const _0x54fde6=_0x257fad[_0x30337e(0x234)]();return _0x5b16d5['floor'](this[_0x30337e(0x5d9)]()*_0x54fde6+_0x54fde6);}}this[_0x30337e(0x30e)](_0x1c38a0);},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x5f0)]=function(){const _0x576261=_0x303df0,_0x4f5042=VisuMZ[_0x576261(0x28b)][_0x576261(0x578)];this[_0x576261(0x55f)]={'type':'none','distance':0x0,'regionList':[]},this[_0x576261(0x582)]=![],this[_0x576261(0x58c)]=![],this[_0x576261(0x4b0)]=![],this[_0x576261(0x4e1)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x576261(0x49c)]=$gameSystem['getEventIconData'](this),this[_0x576261(0x668)]={'text':'','visibleRange':_0x4f5042[_0x576261(0x417)][_0x576261(0x4bf)],'offsetX':_0x4f5042['Label']['OffsetX'],'offsetY':_0x4f5042[_0x576261(0x417)][_0x576261(0x465)]},this['_mirrorSprite']=![],this['_moveOnlyRegions']=[],this[_0x576261(0x474)]={'target':-0x1,'type':_0x576261(0x638),'delay':0x1,'opacityDelta':0x0},this[_0x576261(0x559)]=_0x4f5042[_0x576261(0x3bf)][_0x576261(0x22f)]??0x0,this[_0x576261(0x267)]=![],this[_0x576261(0x228)]={'visible':!![],'filename':_0x4f5042['Movement'][_0x576261(0x56d)]},this[_0x576261(0x2d0)](),this['clearStepPattern']();},Game_Event[_0x303df0(0x2e5)]['checkEventsMoveCoreStringTags']=function(_0x54f57d){const _0x98fc4d=_0x303df0;if(_0x54f57d[_0x98fc4d(0x5bf)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this['_activationProximity'][_0x98fc4d(0x4fa)]=JSON[_0x98fc4d(0x533)]('['+RegExp['$1']['match'](/\d+/g)+']'),this[_0x98fc4d(0x55f)]['type']='region';else _0x54f57d[_0x98fc4d(0x5bf)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(_0x98fc4d(0x57c)===_0x98fc4d(0x403)?this[_0x98fc4d(0x440)]=![]:(type=String(RegExp['$1'])['toLowerCase']()[_0x98fc4d(0x573)](),this[_0x98fc4d(0x55f)][_0x98fc4d(0x63b)]=type,this[_0x98fc4d(0x55f)]['distance']=Number(RegExp['$2'])));_0x54f57d[_0x98fc4d(0x5bf)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x98fc4d(0x582)]=!![]);_0x54f57d['match'](/<CLICK TRIGGER>/i)&&(this[_0x98fc4d(0x58c)]=!![]);if(_0x54f57d[_0x98fc4d(0x5bf)](/<CUSTOM Z:[ ](.*?)>/i)){if(_0x98fc4d(0x60c)===_0x98fc4d(0x4e5))return this['processMoveRouteSetIndex'](_0x1ac37c(_0x3c179f['$1']));else this[_0x98fc4d(0x4b0)]=Number(RegExp['$1'])||0x0;}const _0x4e067b=_0x54f57d[_0x98fc4d(0x5bf)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x4e067b)for(const _0x19bc95 of _0x4e067b){if(_0x98fc4d(0x2ea)!=='zAvFd'){if(_0x19bc95[_0x98fc4d(0x5bf)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){if('DTPhH'!=='DbVAb'){const _0x11912e=String(RegExp['$1'])[_0x98fc4d(0x3ba)]()[_0x98fc4d(0x573)](),_0x1425d9=Number(RegExp['$2']);this[_0x98fc4d(0x4e1)][_0x11912e]=_0x1425d9;}else this[_0x98fc4d(0x1ca)]['x']=this['_character'][_0x98fc4d(0x3e1)](),this['_shadowSprite']['y']=this[_0x98fc4d(0x395)][_0x98fc4d(0x563)](),this[_0x98fc4d(0x1ca)][_0x98fc4d(0x3c7)]=this[_0x98fc4d(0x3c7)],this['_shadowSprite'][_0x98fc4d(0x593)]=this['_character']['isShadowVisible'](),this[_0x98fc4d(0x1ca)][_0x98fc4d(0x336)]=this[_0x98fc4d(0x336)],!this[_0x98fc4d(0x395)][_0x98fc4d(0x519)]()?(this[_0x98fc4d(0x1ca)][_0x98fc4d(0x502)]['x']=_0x423c64[_0x98fc4d(0x59b)](0x1,this[_0x98fc4d(0x1ca)][_0x98fc4d(0x502)]['x']+0.1),this['_shadowSprite']['scale']['y']=_0x5e1b01[_0x98fc4d(0x59b)](0x1,this[_0x98fc4d(0x1ca)][_0x98fc4d(0x502)]['y']+0.1)):(this[_0x98fc4d(0x1ca)][_0x98fc4d(0x502)]['x']=_0x3e25b5[_0x98fc4d(0x399)](0x0,this[_0x98fc4d(0x1ca)]['scale']['x']-0.1),this[_0x98fc4d(0x1ca)][_0x98fc4d(0x502)]['y']=_0x4dab83['max'](0x0,this[_0x98fc4d(0x1ca)][_0x98fc4d(0x502)]['y']-0.1));}}else _0x23f5c9[_0x98fc4d(0x28b)][_0x98fc4d(0x437)][_0x98fc4d(0x249)](this),this[_0x98fc4d(0x538)][_0x98fc4d(0x55b)](this[_0x98fc4d(0x19d)][_0x98fc4d(0x2a2)](this));}if(_0x54f57d[_0x98fc4d(0x5bf)](/<ICON:[ ](\d+)>/i)){if('WhCRk'==='hBZZA'){const _0x305b66=this[_0x98fc4d(0x5a1)](_0x352b78,_0x51dc28,!![]);if(_0x305b66)this[_0x98fc4d(0x653)](_0x305b66);}else this[_0x98fc4d(0x49c)][_0x98fc4d(0x2be)]=Number(RegExp['$1']);}if(_0x54f57d['match'](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x98fc4d(0x4c3)!==_0x98fc4d(0x4c3)){if(_0x10cd9e===0x4)_0x3cdec1=0x6;else _0x39da1f===0x6&&(_0x38c544=0x4);}else this['_eventIcon'][_0x98fc4d(0x51a)]=Number(RegExp['$1']);}_0x54f57d[_0x98fc4d(0x5bf)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x98fc4d(0x49c)][_0x98fc4d(0x27d)]=Number(RegExp['$1']));if(_0x54f57d['match'](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x98fc4d(0x4d1)===_0x98fc4d(0x4d1))this[_0x98fc4d(0x49c)][_0x98fc4d(0x51a)]=Number(RegExp['$1']),this['_eventIcon'][_0x98fc4d(0x27d)]=Number(RegExp['$2']);else return this[_0x98fc4d(0x228)][_0x98fc4d(0x507)];}if(_0x54f57d['match'](/<ICON BLEND MODE:[ ](.*?)>/i)){if(_0x98fc4d(0x3b7)!==_0x98fc4d(0x3b7)){if([0x2,0x4,0x6,0x8][_0x98fc4d(0x37c)](_0x138d84))return 0x4;if([0x1,0x3,0x7,0x9][_0x98fc4d(0x37c)](_0x591282))return 0x5;}else{const _0x4573fb=String(RegExp['$1'])[_0x98fc4d(0x4dc)]()[_0x98fc4d(0x573)](),_0x1fd084=[_0x98fc4d(0x523),_0x98fc4d(0x48a),_0x98fc4d(0x455),'SCREEN'];this[_0x98fc4d(0x49c)][_0x98fc4d(0x4ce)]=_0x1fd084[_0x98fc4d(0x2dc)](_0x4573fb)[_0x98fc4d(0x505)](0x0,0x3);}}_0x54f57d[_0x98fc4d(0x5bf)](/<LABEL:[ ](.*?)>/i)&&(this[_0x98fc4d(0x668)]['text']=String(RegExp['$1'])[_0x98fc4d(0x573)]());_0x54f57d[_0x98fc4d(0x5bf)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x98fc4d(0x668)][_0x98fc4d(0x650)]=String(RegExp['$1'])[_0x98fc4d(0x573)]());_0x54f57d[_0x98fc4d(0x5bf)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x98fc4d(0x668)]['offsetX']=Number(RegExp['$1']));_0x54f57d[_0x98fc4d(0x5bf)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x98fc4d(0x668)][_0x98fc4d(0x21d)]=Number(RegExp['$1']));_0x54f57d[_0x98fc4d(0x5bf)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x98fc4d(0x21e)!==_0x98fc4d(0x3b8)?(this[_0x98fc4d(0x668)][_0x98fc4d(0x301)]=Number(RegExp['$1']),this[_0x98fc4d(0x668)][_0x98fc4d(0x21d)]=Number(RegExp['$2'])):_0x3a1c02[_0x347bdb]?(_0x4c4f2b[_0x98fc4d(0x372)][_0x21db8f]=_0x75d211[_0x4f8b11],_0x57cd2b[_0x5e24f2]=_0x2ec960):_0x50fb2f(this[_0x98fc4d(0x66d)][_0x98fc4d(0x2a2)](this,_0x424398,_0x54fdd4),0x64));$gameTemp[_0x98fc4d(0x627)](this);for(;;){if(_0x98fc4d(0x230)!==_0x98fc4d(0x628)){if(this['_labelWindow'][_0x98fc4d(0x650)][_0x98fc4d(0x5bf)](/\\V\[(\d+)\]/gi))this['_labelWindow'][_0x98fc4d(0x650)]=this[_0x98fc4d(0x668)][_0x98fc4d(0x650)][_0x98fc4d(0x2e6)](/\\V\[(\d+)\]/gi,(_0x5c47b2,_0x42c802)=>$gameVariables[_0x98fc4d(0x5a6)](parseInt(_0x42c802)));else{if(_0x98fc4d(0x623)!==_0x98fc4d(0x669))break;else return _0x6119ab[_0x98fc4d(0x28b)][_0x98fc4d(0x235)]['call'](this)-this['_moveSpeed'];}}else{if(_0x2a9eff[_0x98fc4d(0x50a)](_0x5d7846,_0x30d5a6,_0x43c4ae,this[_0x98fc4d(0x58a)]))return!![];if(_0xb1a277[_0x98fc4d(0x61b)](_0x38cad5,_0x2c3e85,_0x19d43c,this[_0x98fc4d(0x58a)]))return![];return _0x569107['EventsMoveCore'][_0x98fc4d(0x5ea)][_0x98fc4d(0x249)](_0x1abc21,_0x38bad0,_0xa5750d,_0x5dc7ae);}}$gameTemp[_0x98fc4d(0x38e)]();_0x54f57d[_0x98fc4d(0x5bf)](/<LABEL RANGE:[ ](\d+)>/i)&&('BVObQ'===_0x98fc4d(0x27f)?delete this[_0x98fc4d(0x31b)][_0x98fc4d(0x468)]:this['_labelWindow'][_0x98fc4d(0x4df)]=Number(RegExp['$1']));_0x54f57d[_0x98fc4d(0x5bf)](/<MIRROR SPRITE>/i)&&(this[_0x98fc4d(0x615)]=!![]);if(_0x54f57d[_0x98fc4d(0x5bf)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x436110=JSON['parse']('['+RegExp['$1'][_0x98fc4d(0x5bf)](/\d+/g)+']');this[_0x98fc4d(0x46d)]=this[_0x98fc4d(0x46d)][_0x98fc4d(0x5ae)](_0x436110),this[_0x98fc4d(0x46d)][_0x98fc4d(0x40e)](0x0);}if(_0x54f57d[_0x98fc4d(0x5bf)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x114aa2=String(RegExp['$1']);if(_0x114aa2[_0x98fc4d(0x5bf)](/PLAYER/i))_0x98fc4d(0x3fd)===_0x98fc4d(0x22d)?this[_0x98fc4d(0x4a9)]():this[_0x98fc4d(0x474)][_0x98fc4d(0x5f4)]=0x0;else _0x114aa2[_0x98fc4d(0x5bf)](/EVENT[ ](\d+)/i)&&(this[_0x98fc4d(0x474)][_0x98fc4d(0x5f4)]=Number(RegExp['$1']));}if(_0x54f57d[_0x98fc4d(0x5bf)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)){if(_0x98fc4d(0x329)===_0x98fc4d(0x329))this[_0x98fc4d(0x474)][_0x98fc4d(0x63b)]=String(RegExp['$1'])[_0x98fc4d(0x3ba)]()['trim']();else{_0x39005f[_0x98fc4d(0x28b)][_0x98fc4d(0x4a8)][_0x98fc4d(0x2e9)](_0x5c52a7),this[_0x98fc4d(0x501)]=_0x55d378[_0x98fc4d(0x29a)]['length']>0x0;_0x5b9c49['CPC']===_0x573b6e&&_0xef990d[_0x98fc4d(0x28b)][_0x98fc4d(0x4a8)][_0x98fc4d(0x2e9)](_0x172c80);if(_0x1b017a['CPC'][_0x98fc4d(0x21b)]>0x0)return _0x59d4cc[_0x98fc4d(0x5db)](this['_eventId'])&&_0x4d51e6[_0x98fc4d(0x28b)][_0x98fc4d(0x4a8)][_0x98fc4d(0x49a)](_0x49afb0[_0x98fc4d(0x29a)],this[_0x98fc4d(0x221)]);return!![];}}_0x54f57d[_0x98fc4d(0x5bf)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this['_moveSynch']['delay']=Number(RegExp['$1']));_0x54f57d[_0x98fc4d(0x5bf)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this[_0x98fc4d(0x474)][_0x98fc4d(0x2d6)]=Number(RegExp['$1']));if(_0x54f57d['match'](/<TRUE RANDOM MOVE>/i))this[_0x98fc4d(0x559)]=0x0;else{if(_0x54f57d['match'](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)){if(_0x98fc4d(0x569)!=='gWfRD')this['_randomMoveWeight']=Number(RegExp['$1'])||0x0;else{const _0x24c160=_0x3f2687?_0x43b8a8['mapId']():0x0,_0x1ae235=[0x0,0x0,_0x98fc4d(0x3ee)[_0x98fc4d(0x660)](_0x24c160,_0x4c16be)];_0x1744c9[_0x98fc4d(0x680)](_0x1ae235,_0x1078fa);}}}_0x54f57d['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&('UndJg'!=='UndJg'?this[_0x98fc4d(0x2a6)]=_0x51ad20:this['_saveEventLocation']=!![]);if(_0x54f57d[_0x98fc4d(0x5bf)](/<HIDE SHADOW>/i)){if(_0x98fc4d(0x24c)!==_0x98fc4d(0x24c)){const _0x5bfd1e=_0x102338['pages'][_0x413d5c[_0x98fc4d(0x37b)]-0x1][_0x98fc4d(0x341)];this[_0x98fc4d(0x274)](_0x5bfd1e,this[_0x98fc4d(0x68d)]());}else this[_0x98fc4d(0x228)][_0x98fc4d(0x593)]=![];}_0x54f57d[_0x98fc4d(0x5bf)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(_0x98fc4d(0x3a2)===_0x98fc4d(0x3a2)?this['_shadowGraphic'][_0x98fc4d(0x507)]=String(RegExp['$1']):_0x227128[_0x98fc4d(0x680)](_0x3f5890,!!_0x1f3de3));if(_0x54f57d[_0x98fc4d(0x5bf)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)){if(_0x98fc4d(0x50b)==='CfkzM'){if(_0x226bed||this[_0x98fc4d(0x263)]()){if(_0xc68452>0x0&&_0x170632<0x0)return 0x1;if(_0x40de9f<0x0&&_0x1fe038<0x0)return 0x3;if(_0x1e4054>0x0&&_0x29b1f8>0x0)return 0x7;if(_0x5d91a7<0x0&&_0x183a19>0x0)return 0x9;}}else this['_spriteOffsetX']=Number(RegExp['$1']);}_0x54f57d['match'](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x98fc4d(0x1ea)]=Number(RegExp['$1'])),_0x54f57d[_0x98fc4d(0x5bf)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x98fc4d(0x345)]=Number(RegExp['$1']),this[_0x98fc4d(0x1ea)]=Number(RegExp['$2'])),_0x54f57d['match'](/<STEP PATTERN:[ ](.*)>/i)&&(this['_stepPattern']=String(RegExp['$1'])['toUpperCase']()['trim']());},Game_Event[_0x303df0(0x2e5)]['updateEventsMoveCoreTagChanges']=function(){const _0x471cd9=_0x303df0;this[_0x471cd9(0x535)]();},Game_Event[_0x303df0(0x2e5)]['isNearTheScreen']=function(){const _0xe0d0d7=_0x303df0;if(this['_alwaysUpdateMove'])return!![];return Game_Character[_0xe0d0d7(0x2e5)]['isNearTheScreen']['call'](this);},VisuMZ['EventsMoveCore'][_0x303df0(0x65e)]=Game_Event[_0x303df0(0x2e5)][_0x303df0(0x4fb)],Game_Event[_0x303df0(0x2e5)][_0x303df0(0x4fb)]=function(){const _0x2db334=_0x303df0;if(this[_0x2db334(0x1e6)]())return;VisuMZ[_0x2db334(0x28b)][_0x2db334(0x65e)][_0x2db334(0x249)](this);if(this['isMoving']()){if('uXZYz'!==_0x2db334(0x368)){for(let _0x5a50d0=0x1;_0x5a50d0<_0x33b814[_0x2db334(0x553)][_0x2db334(0x21b)];_0x5a50d0++){if(_0x293d43['switches'][_0x5a50d0][_0x2db334(0x5bf)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x14861f['AdvancedSwitches'][_0x2db334(0x1bc)](_0x5a50d0);if(_0x5df5a[_0x2db334(0x553)][_0x5a50d0][_0x2db334(0x5bf)](/<SELF>/i))_0x692631['SelfSwitches']['push'](_0x5a50d0);if(_0x5d4521[_0x2db334(0x553)][_0x5a50d0][_0x2db334(0x5bf)](/<MAP>/i))_0x560f11[_0x2db334(0x4e6)][_0x2db334(0x1bc)](_0x5a50d0);}for(let _0x875c78=0x1;_0x875c78<_0xc86d95[_0x2db334(0x30a)][_0x2db334(0x21b)];_0x875c78++){if(_0x52d099[_0x2db334(0x30a)][_0x875c78]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0xf8ab23[_0x2db334(0x597)]['push'](_0x875c78);if(_0x58ec1e['variables'][_0x875c78]['match'](/<SELF>/i))_0x10807a['SelfVariables'][_0x2db334(0x1bc)](_0x875c78);if(_0x3e9e38[_0x2db334(0x30a)][_0x875c78][_0x2db334(0x5bf)](/<MAP>/i))_0x4fc6e7[_0x2db334(0x201)][_0x2db334(0x1bc)](_0x875c78);}}else VisuMZ['MoveAllSynchTargets'](this[_0x2db334(0x221)]);}},Game_Event['prototype']['isPreventSelfMovement']=function(){const _0xc76802=_0x303df0,_0xd0159f=VisuMZ['EventsMoveCore']['Settings'][_0xc76802(0x3bf)];if($gameMap['isEventRunning']()&&_0xd0159f[_0xc76802(0x420)])return!![];if($gameMessage[_0xc76802(0x3a0)]()&&_0xd0159f[_0xc76802(0x1a2)])return!![];if(!$gameSystem[_0xc76802(0x662)]())return!![];if(this[_0xc76802(0x498)]()>=0x0)return!![];return![];},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x535)]=function(){const _0x18d29f=_0x303df0,_0x4de48c=SceneManager['_scene'][_0x18d29f(0x295)];if(_0x4de48c){if(_0x18d29f(0x365)===_0x18d29f(0x365)){const _0x4a5b43=_0x4de48c[_0x18d29f(0x302)](this);_0x4a5b43&&_0x4a5b43[_0x18d29f(0x1ca)]&&_0x4a5b43[_0x18d29f(0x1ca)][_0x18d29f(0x350)]!==this[_0x18d29f(0x251)]()&&(_0x18d29f(0x4e7)!==_0x18d29f(0x266)?(_0x4a5b43[_0x18d29f(0x1ca)][_0x18d29f(0x350)]=this[_0x18d29f(0x251)](),_0x4a5b43[_0x18d29f(0x1ca)][_0x18d29f(0x538)]=ImageManager['loadSystem'](_0x4a5b43[_0x18d29f(0x1ca)]['_filename'])):this[_0x18d29f(0x1ff)](...arguments));}else this[_0x18d29f(0x4f1)]=0x0;}},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x251)]=function(){const _0xd642d3=_0x303df0;return this[_0xd642d3(0x228)]['filename'];},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x1fb)]=function(){const _0x5f08f5=_0x303df0;if(!this[_0x5f08f5(0x228)][_0x5f08f5(0x593)])return![];return Game_CharacterBase[_0x5f08f5(0x2e5)][_0x5f08f5(0x1fb)][_0x5f08f5(0x249)](this);},Game_Event[_0x303df0(0x2e5)]['labelWindowText']=function(){return this['_labelWindow']['text'];},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x19f)]=function(){const _0x5e8377=_0x303df0;return this[_0x5e8377(0x668)][_0x5e8377(0x4df)];},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x64d)]=function(_0x14af25,_0x7cfb70,_0x1a725b){const _0x295e4b=_0x303df0;if(this[_0x295e4b(0x3c2)]())return this['isMoveOnlyRegionPassable'](_0x14af25,_0x7cfb70,_0x1a725b);if($gameMap[_0x295e4b(0x50a)](_0x14af25,_0x7cfb70,_0x1a725b,'event'))return!![];if($gameMap[_0x295e4b(0x61b)](_0x14af25,_0x7cfb70,_0x1a725b,_0x295e4b(0x5db)))return![];return Game_Character[_0x295e4b(0x2e5)][_0x295e4b(0x64d)]['call'](this,_0x14af25,_0x7cfb70,_0x1a725b);},Game_Event['prototype']['hasMoveOnlyRegions']=function(){const _0x523142=_0x303df0;if(this[_0x523142(0x46d)]===undefined)this['initEventsMoveCoreEffects']();return this['_moveOnlyRegions']['length']>0x0;},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x46a)]=function(_0x286ea4,_0x1bc268,_0x5a4c28){const _0x18db39=_0x303df0,_0x4562d6=$gameMap['roundXWithDirection'](_0x286ea4,_0x5a4c28),_0x272b28=$gameMap[_0x18db39(0x5ca)](_0x1bc268,_0x5a4c28),_0x310148=$gameMap['regionId'](_0x4562d6,_0x272b28);return this[_0x18db39(0x46d)][_0x18db39(0x37c)](_0x310148);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x1b0)]=Game_Event[_0x303df0(0x2e5)][_0x303df0(0x510)],Game_Event[_0x303df0(0x2e5)][_0x303df0(0x510)]=function(){const _0x45220e=_0x303df0;return this[_0x45220e(0x2b9)]=![],this['_CPCs']=![],this[_0x45220e(0x5db)]()?VisuMZ[_0x45220e(0x28b)][_0x45220e(0x1b0)][_0x45220e(0x249)](this):-0x1;},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x66e)]=Game_Event['prototype'][_0x303df0(0x44b)],Game_Event['prototype']['meetsConditions']=function(_0x470883){const _0x2e415c=_0x303df0;this[_0x2e415c(0x29c)](_0x470883),$gameTemp[_0x2e415c(0x627)](this);const _0x2dc3d1=VisuMZ[_0x2e415c(0x28b)][_0x2e415c(0x66e)][_0x2e415c(0x249)](this,_0x470883);return $gameTemp[_0x2e415c(0x38e)](),_0x2dc3d1;},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x4c1)]=function(){const _0x473b6b=_0x303df0;return this[_0x473b6b(0x2b9)];},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x29c)]=function(_0x1933b6){const _0x15da95=_0x303df0,_0x15a791=_0x1933b6['conditions'];if(_0x15a791[_0x15da95(0x4d6)]&&DataManager['isAdvancedSwitch'](_0x15a791[_0x15da95(0x180)]))this[_0x15da95(0x2b9)]=!![];else{if(_0x15a791[_0x15da95(0x57e)]&&DataManager[_0x15da95(0x1b5)](_0x15a791[_0x15da95(0x3ac)])){if(_0x15da95(0x5f6)==='Rmuup')this[_0x15da95(0x2b9)]=!![];else{this[_0x15da95(0x412)]--;if(this[_0x15da95(0x412)]<=0x0&&this[_0x15da95(0x674)]!=='ZZZ')this['clearPose']();}}else _0x15a791[_0x15da95(0x1e5)]&&DataManager['isAdvancedVariable'](_0x15a791[_0x15da95(0x1e8)])&&(this[_0x15da95(0x2b9)]=!![]);}},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x54c)]=function(){const _0x523aec=_0x303df0;if(this[_0x523aec(0x55e)])return![];return this[_0x523aec(0x58c)];},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x661)]=function(){const _0x5b798b=_0x303df0;$gameTemp[_0x5b798b(0x39b)](),this[_0x5b798b(0x2ee)]();},Game_Event[_0x303df0(0x2e5)]['pos']=function(_0x2360e,_0x166b4b){const _0x5788c0=_0x303df0;if(this[_0x5788c0(0x4e1)])return this[_0x5788c0(0x382)](_0x2360e,_0x166b4b);else{if(_0x5788c0(0x550)==='NbLIR'){if(this[_0x5788c0(0x2b0)]===_0x1a96e5)this['initEventsMoveCore']();if(this[_0x5788c0(0x2b0)][_0x5788c0(0x291)]===_0x2b6ef7)this[_0x5788c0(0x348)]();return this['_EventsMoveCoreSettings']['EventAutoMovement'];}else return Game_Character['prototype'][_0x5788c0(0x689)]['call'](this,_0x2360e,_0x166b4b);}},Game_Event[_0x303df0(0x2e5)]['posEventsMoveCore']=function(_0xb524a8,_0x38f92f){const _0x2afaff=_0x303df0;var _0x469010=this['x']-this[_0x2afaff(0x4e1)]['left'],_0x38493f=this['x']+this[_0x2afaff(0x4e1)][_0x2afaff(0x28f)],_0x239e82=this['y']-this[_0x2afaff(0x4e1)]['up'],_0xf5f8be=this['y']+this[_0x2afaff(0x4e1)][_0x2afaff(0x286)];return _0x469010<=_0xb524a8&&_0xb524a8<=_0x38493f&&_0x239e82<=_0x38f92f&&_0x38f92f<=_0xf5f8be;},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x40f)]=function(_0x19cbb6,_0x38f5dc,_0x35bb8b){const _0x338fd4=_0x303df0;for(let _0x2480b6=-this[_0x338fd4(0x4e1)][_0x338fd4(0x42a)];_0x2480b6<=this[_0x338fd4(0x4e1)]['right'];_0x2480b6++){for(let _0x3158fe=-this['_addedHitbox']['up'];_0x3158fe<=this[_0x338fd4(0x4e1)][_0x338fd4(0x286)];_0x3158fe++){if(_0x338fd4(0x4ff)===_0x338fd4(0x4ff)){if(!Game_Character[_0x338fd4(0x2e5)]['canPass'][_0x338fd4(0x249)](this,_0x19cbb6+_0x2480b6,_0x38f5dc+_0x3158fe,_0x35bb8b))return![];}else this[_0x338fd4(0x58e)]=0x0,this[_0x338fd4(0x26b)]=![];}}return!![];},Game_Event[_0x303df0(0x2e5)]['isCollidedWithEvents']=function(_0x375f92,_0x18e434){const _0x178b24=_0x303df0;if(Imported[_0x178b24(0x3e8)]&&this[_0x178b24(0x1a8)]()){if(_0x178b24(0x5ac)===_0x178b24(0x5ac))return this[_0x178b24(0x24e)](_0x375f92,_0x18e434);else{const _0x2a57dd=_0x558af2['event'](_0x57b746(_0x51942c['$1']));return this['processMoveRouteJumpToCharacter'](_0x2a57dd);}}else{if('oGOtW'!==_0x178b24(0x3eb)){const _0x4ab682=$gameMap['eventsXyNt'](_0x375f92,_0x18e434)[_0x178b24(0x528)](_0x487eef=>_0x487eef!==this);return _0x4ab682['length']>0x0;}else{if(this['moveSynchTarget']()>=0x0){const _0x466e81=_0x3f726b[_0x178b24(0x1f1)](this[_0x178b24(0x498)]());if(_0x466e81)return _0x466e81[_0x178b24(0x61a)]();}return _0x3ee787['prototype'][_0x178b24(0x61a)]['call'](this);}}},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x24e)]=function(_0x47021b,_0x2091ed){const _0x2c2c62=_0x303df0;if(!this['isNormalPriority']()){if('NEQhK'===_0x2c2c62(0x3da)){if(this[_0x2c2c62(0x606)](_0x23b063,_0x4be85e))return![];if(!this[_0x2c2c62(0x428)](_0x1b4fa5,_0x8e08f0,_0x454f14))return![];}else return![];}else{if(_0x2c2c62(0x53d)!=='qAJXR')_0xa5e52f[0x2][_0x2c2c62(0x5bf)](/(?:SELF|MAP)/i)?this[_0x2c2c62(0x3e2)](_0x938fc,_0x14d3ed):_0x1c2f20['EventsMoveCore'][_0x2c2c62(0x1cd)][_0x2c2c62(0x249)](this,_0x41ab41,_0x3f47b6);else{const _0x4db9ac=$gameMap[_0x2c2c62(0x3cf)](_0x47021b,_0x2091ed)[_0x2c2c62(0x528)](_0x5213f8=>_0x5213f8!==this&&_0x5213f8['isNormalPriority']());return _0x4db9ac['length']>0x0;}}},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x686)]=function(){const _0x1201db=_0x303df0;return this['_activationProximity'][_0x1201db(0x63b)]||'none';},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x2b5)]=function(){const _0x8c0ab0=_0x303df0;return this[_0x8c0ab0(0x55f)][_0x8c0ab0(0x561)]||0x0;},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x280)]=function(){const _0x5a8256=_0x303df0;return this[_0x5a8256(0x55f)][_0x5a8256(0x4fa)]||[];},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x49d)]=function(){const _0xbb493c=_0x303df0;Game_Character[_0xbb493c(0x2e5)]['increaseSteps']['call'](this);if([_0xbb493c(0x237),'region'][_0xbb493c(0x37c)](this['activationProximityType']()))return;$gamePlayer[_0xbb493c(0x47d)]([0x2]);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x5b0)]=Game_Event[_0x303df0(0x2e5)]['checkEventTriggerAuto'],Game_Event[_0x303df0(0x2e5)][_0x303df0(0x67d)]=function(){const _0x2e14e9=_0x303df0;if(this[_0x2e14e9(0x3a4)]!==0x3)return;if(this[_0x2e14e9(0x52e)])return;if(!this[_0x2e14e9(0x4fe)](![]))return;if(!this[_0x2e14e9(0x23d)](![]))return;VisuMZ['EventsMoveCore']['Game_Event_checkEventTriggerAuto'][_0x2e14e9(0x249)](this);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x352)]=Game_Event[_0x303df0(0x2e5)][_0x303df0(0x64b)],Game_Event[_0x303df0(0x2e5)]['updateParallel']=function(){const _0x4c9dc1=_0x303df0;if(!this[_0x4c9dc1(0x3cb)])return;if(!this['checkRegionEventTrigger'](!![]))return;if(!this[_0x4c9dc1(0x23d)](!![]))return;VisuMZ[_0x4c9dc1(0x28b)]['Game_Event_updateParallel']['call'](this);},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x4fe)]=function(_0x2e8728){const _0xfe6bc2=_0x303df0;if(!_0x2e8728&&$gameMap[_0xfe6bc2(0x5c9)]())return![];if(!_0x2e8728&&$gameMap[_0xfe6bc2(0x56c)]())return![];if(this[_0xfe6bc2(0x280)]()<=0x0)return!![];return $gamePlayer[_0xfe6bc2(0x30b)](this);},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x23d)]=function(_0x2d7ddb){const _0x19cfae=_0x303df0;if(!_0x2d7ddb&&$gameMap['isEventRunning']())return![];if(!_0x2d7ddb&&$gameMap[_0x19cfae(0x56c)]())return![];if([_0x19cfae(0x237),_0x19cfae(0x227)][_0x19cfae(0x37c)](this[_0x19cfae(0x686)]()))return!![];return $gamePlayer[_0x19cfae(0x616)](this);},VisuMZ[_0x303df0(0x483)]=function(_0x6ff32c){const _0x27dafa=_0x303df0;for(const _0x37ad05 of $gameMap[_0x27dafa(0x659)]()){if(!_0x37ad05)continue;if(_0x37ad05[_0x27dafa(0x498)]()===_0x6ff32c){if(_0x27dafa(0x42f)!==_0x27dafa(0x42f))return this['getPosingCharacterDirection']();else _0x37ad05[_0x27dafa(0x207)]();}}},VisuMZ[_0x303df0(0x1f1)]=function(_0x19c3de){if(_0x19c3de===0x0)return $gamePlayer;return $gameMap['event'](_0x19c3de);},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x498)]=function(){const _0x3b0bfe=_0x303df0;return this[_0x3b0bfe(0x474)][_0x3b0bfe(0x5f4)];},Game_Event['prototype'][_0x303df0(0x640)]=function(){const _0x2a39be=_0x303df0;return this[_0x2a39be(0x474)][_0x2a39be(0x63b)];},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x61a)]=function(){const _0xd001e2=_0x303df0;if(this['moveSynchTarget']()>=0x0){if(_0xd001e2(0x182)===_0xd001e2(0x182)){const _0x44f7e8=VisuMZ[_0xd001e2(0x1f1)](this['moveSynchTarget']());if(_0x44f7e8)return _0x44f7e8[_0xd001e2(0x61a)]();}else return this[_0xd001e2(0x2b9)]=![],this[_0xd001e2(0x501)]=![],this[_0xd001e2(0x5db)]()?_0x36c05d[_0xd001e2(0x28b)][_0xd001e2(0x1b0)][_0xd001e2(0x249)](this):-0x1;}return Game_Character[_0xd001e2(0x2e5)][_0xd001e2(0x61a)]['call'](this);},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x207)]=function(){const _0x5c73e9=_0x303df0;this['_moveSynch']['timer']=this[_0x5c73e9(0x474)][_0x5c73e9(0x354)]||0x0,this[_0x5c73e9(0x474)][_0x5c73e9(0x354)]--;if(this[_0x5c73e9(0x474)][_0x5c73e9(0x354)]>0x0)return;this[_0x5c73e9(0x474)]['timer']=this[_0x5c73e9(0x474)][_0x5c73e9(0x1bd)],this[_0x5c73e9(0x460)]();},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x66a)]=function(_0x530c27){const _0x516264=_0x303df0;if(this[_0x516264(0x498)]()>=0x0){const _0x42e2f4=VisuMZ[_0x516264(0x1f1)](this[_0x516264(0x498)]());if(_0x42e2f4){const _0x42be96=$gameMap[_0x516264(0x561)](this['_realX'],this[_0x516264(0x270)],_0x42e2f4[_0x516264(0x1d7)],_0x42e2f4[_0x516264(0x270)])-0x1,_0x5a4727=Math[_0x516264(0x59b)]($gameMap['tileWidth'](),$gameMap[_0x516264(0x234)]()),_0x4967f2=this['_moveSynch']['opacityDelta']||0x0;_0x530c27-=Math[_0x516264(0x399)](0x0,_0x42be96)*_0x5a4727*_0x4967f2;}}return _0x530c27;},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x460)]=function(){const _0x2c66a6=_0x303df0;switch(this['moveSynchType']()){case _0x2c66a6(0x638):this['processMoveSynchRandom']();break;case _0x2c66a6(0x54d):this[_0x2c66a6(0x54e)]();break;case _0x2c66a6(0x31e):this['processMoveSynchAway']();break;case'custom':this[_0x2c66a6(0x5fb)]();break;case _0x2c66a6(0x2f8):case _0x2c66a6(0x2dd):this['processMoveSynchMimic']();break;case'reverse\x20mimic':case _0x2c66a6(0x1cf):this['processMoveSynchReverseMimic']();break;case _0x2c66a6(0x276):case _0x2c66a6(0x28a):case _0x2c66a6(0x347):case _0x2c66a6(0x181):this['processMoveSynchMirrorHorz']();break;case'mirror\x20vertical':case _0x2c66a6(0x27e):case'mirror\x20vert':case _0x2c66a6(0x1de):this[_0x2c66a6(0x332)]();break;default:this['processMoveSynchRandom']();break;}this['update']();},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x34e)]=function(){const _0x27e747=_0x303df0,_0x118063=[0x2,0x4,0x6,0x8];$gameMap[_0x27e747(0x3e3)]()&&_0x118063[_0x27e747(0x1bc)](0x1,0x3,0x7,0x9);const _0xf766a1=[];for(const _0x4bfca7 of _0x118063){if(_0x27e747(0x283)!==_0x27e747(0x3c9)){if(this[_0x27e747(0x40f)](this['x'],this['y'],_0x4bfca7))_0xf766a1[_0x27e747(0x1bc)](_0x4bfca7);}else _0x5cc589[_0x27e747(0x545)]();}if(_0xf766a1[_0x27e747(0x21b)]>0x0){if(_0x27e747(0x3dc)!==_0x27e747(0x3dc))return this[_0x27e747(0x43a)]();else{const _0x596156=_0xf766a1[Math['randomInt'](_0xf766a1['length'])];this['executeMoveDir8'](_0x596156);}}},Game_Event[_0x303df0(0x2e5)]['processMoveSynchApproach']=function(){const _0x5b6ab1=_0x303df0,_0x465e69=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']());this[_0x5b6ab1(0x265)](_0x465e69);},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x411)]=function(){const _0x3e8439=_0x303df0,_0x23b5a3=VisuMZ[_0x3e8439(0x1f1)](this[_0x3e8439(0x498)]());this[_0x3e8439(0x2a0)](_0x23b5a3);},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x5fb)]=function(){const _0x46bb24=_0x303df0;this[_0x46bb24(0x3ec)]();},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x45c)]=function(){const _0x548bbc=_0x303df0,_0xbad58c=VisuMZ[_0x548bbc(0x1f1)](this[_0x548bbc(0x498)]());this[_0x548bbc(0x653)](_0xbad58c[_0x548bbc(0x475)]());},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x5ec)]=function(){const _0x5dacd9=_0x303df0,_0x3b8a7a=VisuMZ[_0x5dacd9(0x1f1)](this[_0x5dacd9(0x498)]());this[_0x5dacd9(0x653)](this['reverseDir'](_0x3b8a7a[_0x5dacd9(0x475)]()));},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x408)]=function(){const _0xb6a466=_0x303df0,_0x24cd8d=VisuMZ[_0xb6a466(0x1f1)](this[_0xb6a466(0x498)]()),_0x20195e=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x24cd8d[_0xb6a466(0x475)]()];this[_0xb6a466(0x653)](_0x20195e);},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x332)]=function(){const _0x3c3b29=_0x303df0,_0x247931=VisuMZ['GetMoveSynchTarget'](this[_0x3c3b29(0x498)]()),_0x523581=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x247931[_0x3c3b29(0x475)]()];this[_0x3c3b29(0x653)](_0x523581);},Game_Event[_0x303df0(0x2e5)]['restoreSavedEventPosition']=function(){const _0x2be88a=_0x303df0,_0xce2a8b=$gameSystem['getSavedEventLocation'](this);if(!_0xce2a8b)return;this['locate'](_0xce2a8b['x'],_0xce2a8b['y']),this[_0x2be88a(0x4e2)](_0xce2a8b[_0x2be88a(0x5a9)]);if(this['_pageIndex']===_0xce2a8b['pageIndex']){if(_0x2be88a(0x2e2)!=='EKRXB'){_0x4ffd3e[_0x2be88a(0x64e)](_0x2b70ad,_0xe48c1e);const _0x34a47c=_0x5108c1[_0x2be88a(0x2bb)]();_0x11b445[_0x2be88a(0x463)]=_0x45475c['MapId']||_0x536bfa[_0x2be88a(0x2c6)](),_0x3a9714[_0x2be88a(0x612)](_0x349185[_0x2be88a(0x463)],_0x109758['EventId']||_0x34a47c['eventId'](),_0x28bd77[_0x2be88a(0x495)],_0x3fb4d3['IconBufferX'],_0xb7841e[_0x2be88a(0x416)],_0x30aa66['IconBlendMode']);}else this[_0x2be88a(0x4d5)]=_0xce2a8b[_0x2be88a(0x37a)];}},Game_Event[_0x303df0(0x2e5)]['updateMove']=function(){const _0x3afcd6=_0x303df0;Game_Character[_0x3afcd6(0x2e5)]['updateMove']['call'](this),this[_0x3afcd6(0x450)]();},Game_Event[_0x303df0(0x2e5)]['isSaveEventLocation']=function(){const _0x51597f=_0x303df0;if($gameMap[_0x51597f(0x3d2)]())return!![];return this['_saveEventLocation'];},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x450)]=function(){const _0x13fb0a=_0x303df0;if(!this[_0x13fb0a(0x1f4)]())return;this[_0x13fb0a(0x42c)]();},Game_Event['prototype'][_0x303df0(0x42c)]=function(){const _0x22dc2f=_0x303df0;$gameSystem[_0x22dc2f(0x42c)](this);},Game_Event[_0x303df0(0x2e5)]['deleteEventLocation']=function(){$gameSystem['deleteSavedEventLocation'](this);},Game_Event['prototype']['getEventIconData']=function(){const _0x4a416f=_0x303df0;if($gameSystem['getEventIconData'](this))return Game_Character[_0x4a416f(0x2e5)]['getEventIconData']['call'](this);else{if(_0x4a416f(0x484)!==_0x4a416f(0x32a))return{'iconIndex':0x0,'bufferX':settings['Icon'][_0x4a416f(0x55d)],'bufferY':settings[_0x4a416f(0x4a4)]['BufferY'],'blendMode':settings[_0x4a416f(0x4a4)]['BlendMode']};else this['contentsOpacity']=0x0;}},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x3d3)]=function(){const _0x3ec6cb=_0x303df0;return this[_0x3ec6cb(0x501)];},VisuMZ[_0x303df0(0x28b)]['Game_Event_meetsConditionsCPC']=Game_Event[_0x303df0(0x2e5)][_0x303df0(0x44b)],Game_Event['prototype'][_0x303df0(0x44b)]=function(_0x18426d){const _0x1938cd=_0x303df0,_0x14bf0c=VisuMZ[_0x1938cd(0x28b)][_0x1938cd(0x2a9)][_0x1938cd(0x249)](this,_0x18426d);if(!_0x14bf0c)return![];return this[_0x1938cd(0x4ed)](_0x18426d);},Game_Event['prototype']['meetsCPC']=function(_0x304c3c){const _0x147e47=_0x303df0;VisuMZ['EventsMoveCore'][_0x147e47(0x4a8)][_0x147e47(0x2e9)](_0x304c3c),this['_CPCs']=_0x304c3c[_0x147e47(0x29a)][_0x147e47(0x21b)]>0x0;if(_0x304c3c[_0x147e47(0x29a)]===undefined){if('LcXrL'!==_0x147e47(0x27c))VisuMZ['EventsMoveCore'][_0x147e47(0x4a8)][_0x147e47(0x2e9)](_0x304c3c);else return _0x49e347[_0x147e47(0x28b)][_0x147e47(0x339)][_0x147e47(0x249)](this)+(this['_spriteOffsetX']||0x0);}if(_0x304c3c['CPC'][_0x147e47(0x21b)]>0x0){if(_0x147e47(0x2ae)===_0x147e47(0x2ae))return $gameMap['event'](this[_0x147e47(0x221)])&&VisuMZ[_0x147e47(0x28b)]['CustomPageConditions']['metCPC'](_0x304c3c[_0x147e47(0x29a)],this['_eventId']);else{this[_0x147e47(0x47d)](_0x527c11);if(_0x3433e2[_0x147e47(0x37c)](0x0)&&this[_0x147e47(0x2aa)]()==='standing')this[_0x147e47(0x59f)](this['x'],this['y']);else(_0x2650b9['includes'](0x1)||_0x501dda[_0x147e47(0x37c)](0x2))&&this['startMapCommonEventOnTouch']();}}return!![];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x328)]=Game_Troop[_0x303df0(0x2e5)][_0x303df0(0x44b)],Game_Troop[_0x303df0(0x2e5)][_0x303df0(0x44b)]=function(_0xfd5fa0){const _0x3ab3bc=_0x303df0;var _0x22bf1e=VisuMZ[_0x3ab3bc(0x28b)][_0x3ab3bc(0x328)][_0x3ab3bc(0x249)](this,_0xfd5fa0);return _0x22bf1e&&this['CPCsMet'](_0xfd5fa0);},Game_Troop[_0x303df0(0x2e5)][_0x303df0(0x2c2)]=function(_0x3aa295){const _0x2447aa=_0x303df0;_0x3aa295[_0x2447aa(0x29a)]===undefined&&('eUdiQ'===_0x2447aa(0x3fb)?VisuMZ[_0x2447aa(0x28b)][_0x2447aa(0x4a8)][_0x2447aa(0x2e9)](_0x3aa295):(_0x2f090a[_0x2447aa(0x5a2)]&&this[_0x2447aa(0x5c6)](_0x54de4b,_0x2fe511['x']+0x2,_0x557e53['y']),_0x39952a['x']+=_0x199aea[_0x2447aa(0x59b)](this[_0x2447aa(0x4ee)](),_0x5e83f5[_0x2447aa(0x264)])+0x4));if(_0x3aa295[_0x2447aa(0x29a)][_0x2447aa(0x21b)]>0x0)return _0x2447aa(0x29d)!==_0x2447aa(0x1ef)?VisuMZ[_0x2447aa(0x28b)][_0x2447aa(0x4a8)][_0x2447aa(0x49a)](_0x3aa295[_0x2447aa(0x29a)],0x0):!![];return!![];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x491)]=Game_Event[_0x303df0(0x2e5)][_0x303df0(0x415)],Game_Event['prototype'][_0x303df0(0x415)]=function(_0x32f1df,_0x298990){const _0x4cf5c7=_0x303df0;VisuMZ[_0x4cf5c7(0x28b)][_0x4cf5c7(0x491)][_0x4cf5c7(0x249)](this,_0x32f1df,_0x298990),this[_0x4cf5c7(0x4fd)]=_0x32f1df,this[_0x4cf5c7(0x250)]=_0x298990;},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x1f2)]=Game_Event[_0x303df0(0x2e5)][_0x303df0(0x17d)],Game_Event['prototype'][_0x303df0(0x17d)]=function(){const _0x42df35=_0x303df0,_0x374c04=$gameMap[_0x42df35(0x561)](this['x'],this['y'],this[_0x42df35(0x4fd)],this[_0x42df35(0x250)]),_0x2c6bd6=_0x374c04*(this[_0x42df35(0x559)]||0x0);Math['random']()>=_0x2c6bd6?_0x42df35(0x25a)===_0x42df35(0x25a)?VisuMZ['EventsMoveCore'][_0x42df35(0x1f2)]['call'](this):(_0x23a381[_0x42df35(0x2c6)]=_0x4fdd9c[_0x42df35(0x4d9)],_0x29b72d[_0x42df35(0x68d)]=_0x2db96b[_0x42df35(0x1b6)]):this[_0x42df35(0x621)]();},Game_Event[_0x303df0(0x2e5)][_0x303df0(0x621)]=function(){const _0x21a45a=_0x303df0,_0x239446=this[_0x21a45a(0x223)](this[_0x21a45a(0x4fd)]),_0xace281=this[_0x21a45a(0x258)](this[_0x21a45a(0x250)]);if(Math['abs'](_0x239446)>Math['abs'](_0xace281))this[_0x21a45a(0x209)](_0x239446>0x0?0x4:0x6),!this[_0x21a45a(0x3a9)]()&&_0xace281!==0x0&&this['moveStraight'](_0xace281>0x0?0x8:0x2);else{if(_0xace281!==0x0){this[_0x21a45a(0x209)](_0xace281>0x0?0x8:0x2);if(!this['isMovementSucceeded']()&&_0x239446!==0x0){if(_0x21a45a(0x608)!==_0x21a45a(0x608))return _0x437980['setFrame'](0x0,0x0,0x0,0x0);else this[_0x21a45a(0x209)](_0x239446>0x0?0x4:0x6);}}}},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x665)]=Game_Interpreter[_0x303df0(0x2e5)]['updateWaitMode'],Game_Interpreter['prototype'][_0x303df0(0x32c)]=function(){const _0x261cf4=_0x303df0;if(this[_0x261cf4(0x518)]==='CallEvent'){if(_0x261cf4(0x19e)!==_0x261cf4(0x1fa)){if(window[this[_0x261cf4(0x1eb)]])this[_0x261cf4(0x518)]='',this['startCallEvent']();else return!![];}else{_0x4bc1db['_spawnData']=_0x1affb6;const _0x215c4d=new _0x3069d7(_0x115aef['mapId'],_0x55b280['eventId']);_0x28199b[_0x261cf4(0x1b9)]=_0x4a673b,_0x215c4d[_0x261cf4(0x4ca)]();let _0x514a1a=_0x46208c-_0x215c4d[_0x261cf4(0x4e1)]['left'],_0x2dbee7=_0x53b8e8+_0x215c4d[_0x261cf4(0x4e1)]['left'],_0x2c9872=_0x3d4999-_0x215c4d[_0x261cf4(0x4e1)]['up'],_0x1c7f7e=_0x17299e+_0x215c4d[_0x261cf4(0x4e1)]['down'];for(let _0x3c40ba=_0x514a1a;_0x3c40ba<=_0x2dbee7;_0x3c40ba++){for(let _0x3d28a9=_0x2c9872;_0x3d28a9<=_0x1c7f7e;_0x3d28a9++){if(this[_0x261cf4(0x606)](_0x3c40ba,_0x3d28a9))return![];}}return!![];}}else return _0x261cf4(0x331)===_0x261cf4(0x5bb)?![]:VisuMZ[_0x261cf4(0x28b)]['Game_Interpreter_updateWaitMode'][_0x261cf4(0x249)](this);},VisuMZ['EventsMoveCore']['Game_Interpreter_executeCommand']=Game_Interpreter[_0x303df0(0x2e5)]['executeCommand'],Game_Interpreter[_0x303df0(0x2e5)]['executeCommand']=function(){const _0x3f792a=_0x303df0,_0x152950=$gameMap&&this[_0x3f792a(0x221)]?$gameMap[_0x3f792a(0x5db)](this[_0x3f792a(0x221)]):null;$gameTemp[_0x3f792a(0x627)](_0x152950);const _0x78c499=VisuMZ[_0x3f792a(0x28b)][_0x3f792a(0x35d)][_0x3f792a(0x249)](this);return $gameTemp[_0x3f792a(0x38e)](),_0x78c499;},VisuMZ[_0x303df0(0x28b)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x303df0(0x2e5)][_0x303df0(0x4f9)],Game_Interpreter['prototype'][_0x303df0(0x4f9)]=function(_0x3ee7b0){const _0x23c6c6=_0x303df0;return $gameTemp[_0x23c6c6(0x349)](this),VisuMZ['EventsMoveCore'][_0x23c6c6(0x453)]['call'](this,_0x3ee7b0);},Game_Interpreter['prototype'][_0x303df0(0x343)]=function(_0x1cdec2){const _0x56574f=_0x303df0;this[_0x56574f(0x444)]=_0x1cdec2;const _0x329cdf=_0x56574f(0x1bb)[_0x56574f(0x660)](_0x1cdec2[_0x56574f(0x2c6)]['padZero'](0x3));this[_0x56574f(0x1eb)]=_0x56574f(0x357)+Graphics[_0x56574f(0x217)]+'_'+this['eventId'](),DataManager[_0x56574f(0x1c8)](this['_callEventMap'],_0x329cdf);if(window[this['_callEventMap']])this[_0x56574f(0x1db)]();else{if(_0x56574f(0x574)!=='wfvWw'){_0x1ba577['ConvertParams'](_0x29e6e4,_0x2c37f3);const _0x54058a=_0x83e965[_0x56574f(0x2bb)]();if(!_0x1d86ed)return;const _0x1f7e50=_0x2758c3[_0x56574f(0x5db)](_0x7dde04[_0x56574f(0x353)]||_0x54058a[_0x56574f(0x68d)]());if(_0x1f7e50)_0x1f7e50['saveEventLocation']();}else this[_0x56574f(0x45f)](_0x56574f(0x1f5));}},Game_Interpreter[_0x303df0(0x2e5)][_0x303df0(0x1db)]=function(){const _0x1a7b81=_0x303df0,_0x5e282b=this[_0x1a7b81(0x444)],_0x412697=window[this['_callEventMap']],_0xa0915a=_0x412697[_0x1a7b81(0x659)][_0x5e282b[_0x1a7b81(0x68d)]];if(_0xa0915a&&_0xa0915a['pages'][_0x5e282b[_0x1a7b81(0x37b)]-0x1]){const _0x4f7d1f=_0xa0915a[_0x1a7b81(0x1f0)][_0x5e282b[_0x1a7b81(0x37b)]-0x1]['list'];this[_0x1a7b81(0x274)](_0x4f7d1f,this[_0x1a7b81(0x68d)]());}window[this['_callEventMap']]=undefined,this[_0x1a7b81(0x1eb)]=undefined,this['_callEventData']=undefined;};function _0x5509(){const _0x3a34cc=['match','_eventSpawnData','72pTFeIu','isAirshipPassable','isEventTest','setCharacterBitmap','setItemChoice','drawIcon','OgQGf','%1Allow','isEventRunning','roundYWithDirection','isSelfSwitch','setMoveRoute','Game_Character_processMoveCommand','Yubvc','pattern','_moveRoute','MEnYY','getPreservedMorphEventData','roundX','requestBalloon','convertSelfVariableValuesInScriptCall','pwYJl','Game_CharacterBase_update','despawnRegions','scrolledY','setupSpawn','event','znFxd','RyyXi','xUpZM','UPPER\x20RIGHT','hasStepAnime','DEMjG','isSpawnedEvent','_proxyWindow','Sprite_Balloon_setup','version','OFF','morphIntoTemplate','weqyF','canStartLocalEvents','Game_CharacterBase_canPass','_eventPageIndex','processMoveSynchReverseMimic','RrXfz','QUESTION','EventForbid','initEventsMoveCoreEffects','Game_CharacterBase_setDirection','SPIN\x20COUNTERCLOCKWISE','Window_NumberInput_start','target','Game_Temp_setDestination','Rmuup','PosX','checkCollisionKeywords','string','create','processMoveSynchCustom','updateScale','Window_EventItem_onOk','initEventsMoveCoreSettings','_shadowOpacity','EventAllow','prepareSpawnedEventAtTerrainTag','ZaOoh','LBtMm','EventTimerFramesSet','firstSpawnedEventID','checkExistingEntitiesAt','status','eCYOY','gDcRz','nuyaB','correctFacingDirection','Mqfgt','isLandOk','setBackgroundType','turn180','processMoveRouteMoveToCharacter','setFrame','setEventIconDataKey','Game_Vehicle_initMoveSpeed','Toggle','_mirrorSprite','meetActivationProximityConditions','zoomScale','EventTimerPause','apply','realMoveSpeed','isRegionForbidPass','Enable','setDestination','Letter','_comments','GeZqU','moveBackToRandomHome','DiagonalSpeedMultiplier','xgbvV','qQTLh','setCommonEvent','registerCommand','registerSelfTarget','OXTeK','clearEventCache','HhVPg','WalkForbid','BufferY','getDirectionToPoint','SelfSwitchID','setupFollowerVisibilityOverrides','_diagonalSupport','directionOnLadderSpriteVS8dir','rotation','MUSIC-NOTE','_periodicRefreshTimer','processMoveRouteFadeOut','BalloonOffsetX','isJumping','random','4220Wkbsbp','_pattern','type','Game_Switches_setValue','LHvFY','EventLabelVisible','VariableGetSelfVariableID','moveSynchType','OHrmy','EYEJd','spawnEventId','updateOpacity','return\x200','split','DashModifier','baTRz','RdEQB','move','updateParallel','SLEEP','isMapPassable','ConvertParams','removeChild','text','onDatabaseLoaded','XFOBv','executeMoveDir8','YVSOj','canPassDiagonally','BkJha','Allow','findDiagonalDirectionTo','events','absDistance','_forceHidePlayer','_forceCarrying','Game_Map_setupEvents','Game_Event_updateSelfMovement','_SavedEventLocations','format','onClickTrigger','isAllowEventAutoMovement','ZvaBC','disable','Game_Interpreter_updateWaitMode','followers','updateEventMirrorSprite','_labelWindow','rCVnx','adjustMoveSynchOpacityDelta','requestRefresh','some','VisuMZ_Setup_Preload_Map','Game_Event_meetsConditions','Game_Follower_chaseCharacter','createIconSprite','UymlK','FollowerReset','WSyfN','_pose','determineCommonEventsWithCPC','EnableDashTilt','turnAwayFromPoint','processMoveRouteHugWall','AirshipSpeed','SpawnEventAtXY','Game_Map_parallelCommonEvents','Map%1-Event%2','checkEventTriggerAuto','Game_Variables_setValue','NovKX','setValue','isPlayerControlDisabled','setPlayerDiagonalSetting','hideShadows','VisuMZ_2_DragonbonesUnion','EVAL','activationProximityType','process_VisuMZ_EventsMoveCore_Switches_Variables','determineEventOverload','pos','STRUCT','Scene_Boot_onDatabaseLoaded','_characterIndex','eventId','YrEZs','SelfVariables','moveTypeRandom','CxRwG','%1%2','switch1Id','horz\x20mirror','QWyAa','ShipSpeed','timerText','isOnRope','isPassableByAnyDirection','processMoveRouteMoveRepeat','Region%1','FjFGn','Self\x20Variable\x20%1','posNt','_visibleEventX','%1DockRegionOnly','isEventOverloaded','square','_reflection','SpawnEventDespawnRegions','despawnEverything','Window_Message_startMessage','setup','registerSelfEvent','FollowerSetControl','_eventMorphData','BWdTX','processOk','pkXZR','isDashDisabled','setMapValue','updateBitmapSmoothing','mHGZL','labelWindowRange','inBattle','padZero','StopAutoMoveMessages','COLLAPSE','Game_CharacterBase_isTransparent','lqDxx','%1Forbid','updatePeriodicRefresh','isSmartEventCollisionOn','removeMorph','WpFWi','Visible','setMoveSpeed','Game_Map_events','processMoveRouteTeleportTo','isBattleTest','Game_Event_findProperPageIndex','75229thaHGa','HuXsV','isMapSwitch','AccCe','isAdvancedSwitch','EventID','DpBfu','smooth','_spawnData','SpawnEventAtRegion','Map%1.json','push','delay','setTileBitmap','_eventIconSprite','checkNeedForPeriodicRefresh','nPdMV','_regionRules','textSizeEx','WXHNX','Game_Character_forceMoveRoute','roundXWithDirection','setupDiagonalSupport','loadDataFile','add','_shadowSprite','processMoveRouteJumpTo','eventsXy','Game_SelfSwitches_setValue','pageIndex','reverse\x20copy','clearDashing','uxZXa','TzsQh','Game_Followers_isVisible','Speed','CBFsB','gRTDB','_realX','executeMove','ILpfn','_stepPattern','startCallEvent','player','Game_Player_increaseSteps','vert\x20mirror','Step2MapId','DLzUJ','tIbUq','MSkbi','Sprite_Character_setTileBitmap','VisibleEventLabels','variableValid','isPreventSelfMovement','PageId','variableId','isWorking','_spriteOffsetY','_callEventMap','moveAwayFromPoint','CzrGd','map','gklaM','pages','GetMoveSynchTarget','Game_Event_moveTypeRandom','deltaY','isSaveEventLocation','CallEvent','isPlayerForceShown','PBdaH','OQTAE','CarryPose','GdePi','isShadowVisible','defaultFontSize','VS8','updateShadow','initialize','JERnQ','MapVariables','SfdBc','EventTemplates','Game_CharacterBase_characterIndex','HMPH','moveForward','updateMoveSynch','WalkAllow','moveStraight','isAutoBufferIcon','isBigCharacter','TQbJM','isMoving','code','SWEAT','needsUpdate','YSxPQ','LEeon','EventTimerExpireClear','EventLocationDelete','List','5955402cjOfjV','frameCount','All','PreMorphJS','backX','length','UJEex','offsetY','NPhsJ','GVCLg','tGKDQ','_eventId','_commonEventId','deltaXFrom','frontX','isDashing','FontSize','region','_shadowGraphic','isDestinationValid','QsypD','TApjR','MUSIC\x20NOTE','JVmwx','Window_NumberInput_processOk','RandomMoveWeight','BhkAV','setImage','boat','mLynd','tileHeight','Game_CharacterBase_realMoveSpeed','setControlledFollowerID','none','updateEventCustomZ','selfValue','SelfSwitches','FollowerSetTargetChase','Event','checkActivationProximity','Game_Player_isDashing','PjvtL','_forceShowPlayer','jump','_selfEvent','characterIndexVS8','Sprite_Balloon_updatePosition','LjzOg','padding','setFrames','qLEPQ','call','Frames','ZgwDy','jomYJ','setupEventsMoveCoreCommentTags','checkSmartEventCollision','processMoveRouteSelfSwitch','_randomHomeY','shadowFilename','Game_Switches_value','Game_CharacterBase_screenY','startMessage','gdvQZ','Game_SelfSwitches_value','makeDeepCopy','deltaYFrom','xMGFv','qiKyQ','characterIndex','Sprite_Character_characterPatternY','Game_Timer_stop','checkValidEventerMap','_cacheVisibility','Visibility','deleteSavedEventLocation','MUSIC','isSpriteVS8dir','iconWidth','moveTowardCharacter','obvIG','_saveEventLocation','resume','BKHvG','_paused','_followerChaseOff','Spriteset_Map_createShadow','setChaseOff','_eventScreenX','setDiagonalDirection','_realY','FALSE','pCGVD','setupPlayerVisibilityOverrides','setupChild','SwitchGetSelfSwitchID','mirror\x20horizontal','wbRzk','constructor','Game_Map_isDashDisabled','PhLnU','findDirectionTo','zIepL','bufferY','vertical\x20mirror','dXyZb','activationRegionList','deleteIconsOnEventsDataKey','1165775aWpxVd','xnqSP','COAHQ','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','down','gainFrames','Game_CharacterBase_pattern','onOk','horizontal\x20mirror','EventsMoveCore','processMoveRoutePatternLock','EventIconChange','getInputDir8','right','initMembersEventsMoveCore','EventAutoMovement','SelfSwitchABCD','setupMorphEvent','zbzgs','_spriteset','updatePatternEventsMoveCore','_eventCache','oZAfe','parallelCommonEvents','CPC','createShadow','checkAdvancedSwitchVariablePresent','VaHUr','BalloonOffsetY','_needsPeriodicRefresh','moveAwayFromCharacter','isCollidedWithPlayerCharacters','bind','isStopFollowerChasing','ARRAYSTRUCT','onExpire','_DisablePlayerControl','_eventErased','oxexy','Game_Event_meetsConditionsCPC','startMapCommonEventOnOKTarget','ROUTE_SCRIPT','MRwWJ','updateTilt','uiZiC','aZhRa','_EventsMoveCoreSettings','_mapId','AllForbid','STR','createLabelWindows','activationProximityDistance','_saveEventLocations','nuqjz','setDashingEnabled','_advancedSwitchVariable','Flcei','getLastPluginCommandInterpreter','deltaX','_event','iconIndex','_eventOverloadThreshold','hpNmE','isRunning','CPCsMet','contents','processMoveRouteMoveTo','isVisible','mapId','SpawnEventDespawnEverything','eixkC','USER-DEFINED\x202','restoreSavedEventPosition','getInputDirection','%1:%2','GWGIp','_labelWindows','WpTRX','clearSpriteOffsets','aZAeB','Game_Event_start','getEventIconIndex','ViWUA','QsjIq','opacityDelta','zzzjI','setPattern','backY','ITEM','Game_Variables_value','indexOf','copy','2tasCqU','BULB','getMapSpawnedEventData','Window_ScrollText_startMessage','EKRXB','hasEventIcon','_chaseOff','prototype','replace','RegionOkTarget','Game_Player_checkEventTriggerHere','loadCPC','BLtZL','cwCLO','processMoveRouteJumpToCharacter','_forceShowFollower','start','Game_CharacterBase_updatePattern','updatePattern','Game_Event_setupPageSettings','width','chaseCharacter','initMoveSpeed','ewbyS','_patternLocked','dashSpeedModifier','mimic','WWyyh','clearCarrying','AutoBalloon','CnVNm','Scene_Map_startEncounterEffect','Game_Enemy_meetsSwitchCondition','isValid','XeyUk','offsetX','findTargetSprite','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','diPxR','_lastMovedDirection','standing','cBBBW','JfFAF','Game_Message_add','variables','meetActivationRegionConditions','HEART','_isObjectCharacter','checkEventsMoveCoreStringTags','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','of\x20Preloaded\x20Maps.\x0a\x0a','FESlw','log','isTargetEventValidForLabelWindow','AutoBuffer','processMoveRouteSetIndex','processMoveRouteMoveUntilStop','kfekB','Window_EventItem_onCancel','tmsJG','isShip','_EventIcons','Lribv','Passability','away','PlayerMovementDiagonal','unlock','PosY','Game_Interpreter_character','isLabelVisible','FRUSTRATION','PlayerMovementChange','_moveAllowPlayerCollision','isDashingAndMoving','Game_Troop_meetsConditionsCPC','lAJDL','nfiOg','_seconds','updateWaitMode','mBjqk','setEventLabelsVisible','Game_CharacterBase_initMembers','PlayerAllow','KnvUF','processMoveSynchMirrorVert','forceMoveRoute','isActive','moveDiagonally','_hidden','updateVS8BalloonOffsets','_speed','Game_CharacterBase_screenX','Game_Timer_start','PlayerIconChange','_frames','firstSpawnedEvent','VUQap','Step1EventId','areFollowersForceShown','list','ZZZ','pluginCommandCallEvent','getControlledFollowerID','_spriteOffsetX','_screenZoomScale','mirror\x20horz','initEventsMoveCore','setLastPluginCommandInterpreter','Game_Message_setNumberInput','getEventIconData','checkEventTriggerHere','VFwpY','processMoveSynchRandom','UNYax','_filename','anchor','Game_Event_updateParallel','EventId','timer','slice','NLICv','$callEventMap','exit','EXCLAMATION','VehicleAllow','vNSNT','TiltLeft','Game_Interpreter_executeCommand','LEFT','canMove','GnUqq','tvJvm','LIGHTBULB','RIGHT','EventLabelRefresh','cIyQE','changeSpeed','Game_Player_isMapPassable','uXZYz','JSON','isRegionDockable','getPlayerDiagonalSetting','_lastPluginCommandInterpreter','airship','FUNC','isInVehicle','command108','hasDragonbones','PreloadedMaps','Preserve','Game_Event_initialize','stop','terrainTag','RegionTouch','Game_Follower_initialize','fKnVJ','moveRouteIndex','pageId','includes','Sprite_Character_initMembers','isPassable','_forceHideFollower','Game_Vehicle_isLandOk','pUSGW','posEventsMoveCore','_PreservedEventMorphData','GoqEm','AwkaS','Map\x20%1\x20Switch\x20%2','TemplateName','Game_CharacterBase_isDashing','regionId','trigger','UNTITLED','reverseDir','Game_Player_checkEventTriggerThere','clearSelfTarget','NOTE','forceCarrying','_needsRefresh','_MapSpawnedEventData','drawText','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','_character','isAirship','screenY','EventTimerExpireEvent','max','bLTPt','clearDestination','floor','front','_visibleEventY','PreSpawnJS','isBusy','_pageIndex','mDTLQ','reverse','_trigger','turnTowardCharacter','RemovePreserve','adjustDir8MovementSpeed','deletePreservedMorphEventDataKey','isMovementSucceeded','setAllowEventAutoMovement','screenX','switch2Id','prepareSpawnedEventAtRegion','KIUNT','createLabelWindowForTarget','General','OTEbA','yjHOZ','Game_Map_unlockEvent','EventTimerResume','VehicleDock','VvZXq','JEDWg','fpTIZ','Bghfm','toLowerCase','parent','initFollowerController','sajFS','Step2EventId','Movement','vvMDf','update','hasMoveOnlyRegions','COBWEB','parameters','zqoMp','XEBxM','opacity','jkRZz','xvPmT','Seconds','_interpreter','YEYgz','ccsZC','raDLt','eventsXyNt','VICTORY','mainFontSize','isSaveEventLocations','hasCPCs','createContents','_encounterEffectDuration','%1Dock','_moveSpeed','setupEventsMoveCoreNotetags','setBalloonPose','pQLKc','vehicle','fqJpD','startEncounterEffect','DOWN','radius','roundY','shadowX','setSelfValue','isSupportDiagonalMovement','OpacitySpeed','meetsSwitchCondition','omren','GcHIZ','VisuMZ_0_CoreEngine','_text','_cacheSystemVisible','RgLxi','updateRoutineMove','createProxyWindow','Map\x20%1\x20Variable\x20%2','Ship','abs','Game_Player_executeMove','createLowerLayer','YnPMi','hvVVk','QWCGg','ZNqiE','dvPEI','pQOHF','innerWidth','PlayerIconDelete','eUdiQ','KvYBN','roGyl','ANNOYED','default','Game_Event_event','5kmVJeJ','dir8','EdIoV','JsrxC','labelWindowText','DashingEnable','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','processMoveSynchMirrorHorz','ChAZf','DzQwY','Game_Map_update','processMoveRouteStepTo','TargetSwitchId','remove','canPass','...','processMoveSynchAway','_poseDuration','isTransparent','iconHeight','locate','IconBufferY','Label','Region','ynvxj','XlhnI','UNfzK','initMembers','Minutes','tdRMo','advancedFunc','StopAutoMoveEvents','Game_CharacterBase_moveStraight','createShadows','KNEEL','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','HBvFR','processMoveRouteTeleportToCharacter','WLnFk','isSpawnHitboxCollisionOk','prepareSpawnedEventAtXY','left','USER-DEFINED\x205','saveEventLocation','Game_System_initialize','isPlaytest','ZYBdH','_cpc','setStopFollowerChasing','PostSpawnJS','_characterSprites','getPosingCharacterDirection','Chase','updateEventsMoveCoreTagChanges','Sprite_Character_setCharacterBitmap','PostMorphJS','windowPadding','forceDashing','QZkmK','resizeWindow','hMqhd','searchLimit','AdvancedSwitches','_forceDashing','USER-DEFINED\x201','_duration','setupSpawnedEvents','_callEventData','updatePosition','splice','IghUg','Gjejb','TerrainTags','despawnEventId','meetsConditions','Game_Character_setMoveRoute','OkmtK','CommonEventID','Game_CharacterBase_opacity','autosaveEventLocation','HHbBi','Boat','Game_Interpreter_PluginCommand','pLLDd','MULTIPLY','characterPatternYBasic','_selfTargetItemChoice','Game_Message_setItemChoice','IconSize','_inputTime','Name','processMoveSynchMimic','jUPPV','Rope','setWaitMode','processMoveSynch','createSpawnedEventWithData','_visiblePlayerX','MapId','isEventClickTriggered','OffsetY','FastForwardKey','erase','Player','Game_Event_isCollidedWithPlayerCharacters','isMoveOnlyRegionPassable','_opacity','LIGHT\x20BULB','_moveOnlyRegions','SPIN\x20ANTICLOCKWISE','_expireCommonEvent','FnrJP','setupRegionRestrictions','despawnAtXY','processMoveCommandEventsMoveCore','_moveSynch','lastMovedDirection','rhzDs','TOGGLE','updatePose','requestAnimation','SILENCE','KLPCo','Game_Player_getInputDirection','checkEventTriggerEventsMoveCore','setupEventsMoveCoreEffects','getSelfTarget','EzCNZ','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','name','MoveAllSynchTargets','yEOip','NUM','UtWsW','processMoveRouteStepToCharacter','template','areFollowersForceHidden','ADDITIVE','moveTowardPoint','efWUj','executeCommand','Self\x20Switch\x20%1','height','IconBufferX','Game_Event_locate','CKhBs','VariableId','DiBGj','IconIndex','MUSICNOTE','character','moveSynchTarget','checkEventTriggerThere','metCPC','autoEventIconBuffer','_eventIcon','increaseSteps','TihFa','createCharacterShadow','_working','getPosingCharacterPattern','PostCopyJS','Template','Icon','EventTimerFramesGain','savePreservedMorphEventDataKey','referEvent','CustomPageConditions','startMapCommonEventOnTouch','_eventLabelOffsetY','_spawnedEvents','lastSpawnedEvent','ARRAYSTR','mJKGx','isMapVariable','_customZ','jmcDr','DKnuN','ship','isPlayerForceHidden','boxWidth','page','FollowerSetGlobalChase','mapValue','convertVariableValuesInScriptCall','ulEaG','Spriteset_Map_createLowerLayer','onLoadSuccess','TyUiQ','getSavedEventLocation','VisibleRange','qrrbN','hasAdvancedSwitchVariable','Collision','fiHjP','Game_Troop_meetsConditions','_eventScreenY','processMoveRouteAnimation','turnLeft90','reserveCommonEvent','mGDCy','refresh','SpawnEventDespawnAtXY','Hjqht','processMoveRouteSelfVariable','blendMode','BitmapSmoothing','ARRAYFUNC','xcKOf','Game_Timer_initialize','setupSaveEventLocations','jFUqv','_moveRouteIndex','switch1Valid','OxAxO','PlayerForbid','MapID','eventLabelsVisible','Operation','toUpperCase','_stopCount','LIGHT','visibleRange','destinationX','_addedHitbox','setDirection','_data','getPosingCharacterIndex','ZDtFp','MapSwitches','dnyOt','$preloadedMap_%1','follower','advancedValue','round','IconSet','meetsCPC','iconSize','_spawnPreserved','_eventLabelOffsetX','contentsOpacity','Dock','createBitmap','Walk','LOVE','ntloA','switchId','createSpawnedEvent','command357','regionList','updateSelfMovement','_eventOverload','_randomHomeX','checkRegionEventTrigger','NLwyM','Game_CharacterBase_direction','_CPCs','scale','Setting','BlendMode','clamp','SwitchGetSelfSwitchABCD','filename','characterName','AutoMoveEvents','isRegionAllowPass','JQvec','LonJX','mksBd','unlockEvent','processMoveRouteFadeIn','findProperPageIndex','Step1MapId','_commonEvents','oWYlw','removeTemporaryMapSpawnedEvents','KCxLn','TiltRight','Game_Event_clearPageSettings','_waitMode','isShadowShrink','bufferX','lineHeight','processMoveRouteJumpForward','HURT','isTriggerIn','setOpacity','onCancel','_eventCopyData','EventLocationCreate','NORMAL','SuccessSwitchId','ARRAYEVAL','3923433CvTqaa','_characterName','filter','Forbid','deleteIconsOnEventsData','frontY','createSaveEventLocationData','SPIN\x20CLOCKWISE','_activationProximityAutoTriggerBypass','SelfVariableID','2066655HMfoTo','processMoveCommand','Direction','parse','deleteSavedEventLocationKey','updateShadowChanges','1055444eAbDcn','ShowShadows','bitmap','setNumberInput','_scene','description','setPose','qAJXR','CDOfI','SpawnEventDespawnTerrainTags','lgXkk','isOnLadder','itemPadding','Game_CharacterBase_moveDiagonally','turnAwayFromCharacter','clear','UPPER\x20LEFT','mvzKD','isPosing','hBWfd','isDiagonalDirection','Game_Vehicle_isMapPassable','hasClickTrigger','approach','processMoveSynchApproach','USER-DEFINED\x204','fTBBr','Hours','ANGER','switches','isAllowCharacterTilt','useCarryPoseForIcons','Game_Map_refresh','Game_Map_event','_target','_randomMoveWeight','SwitchId','addLoadListener','clearPose','BufferX','_erased','_activationProximity','BcOsO','distance','_visiblePlayerY','shadowY','TargetVariableId','addChild','ttgUE','isSelfVariable','drawTextEx','BpifY','CtlpC','_tilemap','isAnyEventStarting','DefaultShadow','AhcZd','setupCopyEvent','row','Scene_Load_onLoadSuccess','SpriteBased','trim','wfvWw','isDashingEnabled','OperateValues','_PlayerDiagonalSetting','Settings','GKCpM','rKbCB','loadSystem','zjKLQ','Sprite_Character_update','switch2Valid','characterPatternY','Value','fHocG','_alwaysUpdateMove','CQygt','Game_Map_setup','Game_Timer_onExpire','Game_CharacterBase_increaseSteps','_selfTargetNumberInput','MorphEventRemove','LOWER\x20RIGHT','_type','setEventIconData','_clickTrigger','charAt','_followerControlID','fontFace','updateText','resetFontSettings','101339FtWoXN','visible','despawnTerrainTags','Game_CharacterBase_hasStepAnime','Dtreg','AdvancedVariables','opacitySpeed','clearStepPattern','TerrainTag','min','fittingHeight','SpawnEventAtTerrainTag','updateEventIconSprite','startMapCommonEventOnOK','clearPageSettings','getDirectionFromPoint','drawing','outlineColor','MoveRouteIndex','characterPatternYVS8','value','fontSize','dCaih','direction','umtwB','column','UtDyN','UBEtc','concat','morphInto','Game_Event_checkEventTriggerAuto','randomInt','RgWCZ','VnzCM','obYDh','turnRight90','pause','IconBlendMode','RegionOk','_selfTarget','tYryh','SnaJe','FollowerID','note','qnKZo'];_0x5509=function(){return _0x3a34cc;};return _0x5509();}function _0x49fd(_0x37f1dd,_0x17d1a4){const _0x550906=_0x5509();return _0x49fd=function(_0x49fde4,_0x54066e){_0x49fde4=_0x49fde4-0x17b;let _0x302fb3=_0x550906[_0x49fde4];return _0x302fb3;},_0x49fd(_0x37f1dd,_0x17d1a4);}function Game_CPCInterpreter(){const _0x43543a=_0x303df0;this['initialize'][_0x43543a(0x619)](this,arguments);};Game_CPCInterpreter[_0x303df0(0x2e5)]=Object[_0x303df0(0x5fa)](Game_Interpreter[_0x303df0(0x2e5)]),Game_CPCInterpreter['prototype'][_0x303df0(0x278)]=Game_CPCInterpreter,Game_CPCInterpreter['prototype'][_0x303df0(0x545)]=function(){const _0x161935=_0x303df0;Game_Interpreter[_0x161935(0x2e5)][_0x161935(0x545)][_0x161935(0x249)](this),this[_0x161935(0x430)]=![];},Game_CPCInterpreter['prototype']['execute']=function(){const _0x1056c1=_0x303df0;while(this[_0x1056c1(0x2c1)]()){this[_0x1056c1(0x48d)]();}},Game_CPCInterpreter[_0x303df0(0x2e5)][_0x303df0(0x370)]=function(_0x351443){const _0x4dabbf=_0x303df0;return Game_Interpreter[_0x4dabbf(0x2e5)]['command108']['call'](this,_0x351443),this[_0x4dabbf(0x61f)]['some'](_0xbd09af=>_0xbd09af[_0x4dabbf(0x5bf)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x4dabbf(0x430)]=!![]),!![];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x2fd)]=Scene_Map[_0x303df0(0x2e5)][_0x303df0(0x3dd)],Scene_Map['prototype']['startEncounterEffect']=function(){const _0xfbd2e0=_0x303df0;VisuMZ['EventsMoveCore'][_0xfbd2e0(0x2fd)][_0xfbd2e0(0x249)](this),this[_0xfbd2e0(0x295)]['hideShadows']();},VisuMZ[_0x303df0(0x28b)]['Scene_Load_onLoadSuccess']=Scene_Load['prototype'][_0x303df0(0x4bc)],Scene_Load['prototype'][_0x303df0(0x4bc)]=function(){const _0x52c274=_0x303df0;if($gameMap)$gameMap['clearEventCache']();VisuMZ['EventsMoveCore'][_0x52c274(0x571)][_0x52c274(0x249)](this);},VisuMZ['EventsMoveCore'][_0x303df0(0x37d)]=Sprite_Character['prototype'][_0x303df0(0x41c)],Sprite_Character[_0x303df0(0x2e5)][_0x303df0(0x41c)]=function(){const _0x49deb2=_0x303df0;VisuMZ[_0x49deb2(0x28b)]['Sprite_Character_initMembers'][_0x49deb2(0x249)](this),this[_0x49deb2(0x290)](),this[_0x49deb2(0x670)]();},Sprite_Character['prototype'][_0x303df0(0x290)]=function(){const _0x43a093=_0x303df0;this[_0x43a093(0x5ff)]=0xff;},Sprite_Character[_0x303df0(0x2e5)]['createIconSprite']=function(){const _0x40bb2a=_0x303df0;this['_eventIconSprite']=new Sprite(),this[_0x40bb2a(0x1bf)]['bitmap']=ImageManager[_0x40bb2a(0x57b)](_0x40bb2a(0x4ec)),this[_0x40bb2a(0x1bf)][_0x40bb2a(0x538)][_0x40bb2a(0x1b8)]=![],this[_0x40bb2a(0x1bf)][_0x40bb2a(0x611)](0x0,0x0,0x0,0x0),this[_0x40bb2a(0x1bf)][_0x40bb2a(0x351)]['x']=0.5,this[_0x40bb2a(0x1bf)][_0x40bb2a(0x351)]['y']=0x1,this[_0x40bb2a(0x565)](this[_0x40bb2a(0x1bf)]);},Sprite_Character[_0x303df0(0x2e5)][_0x303df0(0x263)]=function(){const _0x9ce084=_0x303df0;return this[_0x9ce084(0x527)]&&this[_0x9ce084(0x527)][_0x9ce084(0x5bf)](/\[VS8\]/i);},Sprite_Character[_0x303df0(0x2e5)][_0x303df0(0x20a)]=function(){const _0x4d20e9=_0x303df0;return this['isSpriteVS8dir']()&&VisuMZ['EventsMoveCore'][_0x4d20e9(0x578)]['VS8'][_0x4d20e9(0x314)];},VisuMZ[_0x303df0(0x28b)]['Sprite_Character_update']=Sprite_Character[_0x303df0(0x2e5)]['update'],Sprite_Character['prototype'][_0x303df0(0x3c1)]=function(){const _0x146639=_0x303df0;VisuMZ[_0x146639(0x28b)][_0x146639(0x57d)]['call'](this),VisuMZ[_0x146639(0x28b)][_0x146639(0x578)][_0x146639(0x3bf)][_0x146639(0x676)]&&this[_0x146639(0x2ad)](),this[_0x146639(0x1ca)]&&this[_0x146639(0x1fe)](),this[_0x146639(0x1bf)]&&this[_0x146639(0x59e)](),this[_0x146639(0x238)](),this[_0x146639(0x667)]();},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x1e3)]=Sprite_Character[_0x303df0(0x2e5)]['setTileBitmap'],Sprite_Character[_0x303df0(0x2e5)][_0x303df0(0x1be)]=function(){const _0x26f227=_0x303df0;VisuMZ[_0x26f227(0x28b)]['Sprite_Character_setTileBitmap']['call'](this),this[_0x26f227(0x538)][_0x26f227(0x55b)](this['updateBitmapSmoothing'][_0x26f227(0x2a2)](this));},VisuMZ['EventsMoveCore'][_0x303df0(0x437)]=Sprite_Character[_0x303df0(0x2e5)][_0x303df0(0x5c4)],Sprite_Character[_0x303df0(0x2e5)][_0x303df0(0x5c4)]=function(){const _0x26b683=_0x303df0;VisuMZ['EventsMoveCore'][_0x26b683(0x437)][_0x26b683(0x249)](this),this[_0x26b683(0x538)]['addLoadListener'](this[_0x26b683(0x19d)][_0x26b683(0x2a2)](this));},Sprite_Character['prototype'][_0x303df0(0x19d)]=function(){const _0x24152b=_0x303df0;if(!this[_0x24152b(0x538)])return;this[_0x24152b(0x538)]['smooth']=!!VisuMZ[_0x24152b(0x28b)][_0x24152b(0x578)]['Movement'][_0x24152b(0x4cf)];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x25c)]=Sprite_Character[_0x303df0(0x2e5)][_0x303df0(0x57f)],Sprite_Character[_0x303df0(0x2e5)]['characterPatternY']=function(){const _0x1b8420=_0x303df0;if(this[_0x1b8420(0x263)]()){if(_0x1b8420(0x494)!==_0x1b8420(0x673))return this[_0x1b8420(0x5a5)]();else{const _0x3ad33e=_0x25b617[_0x1b8420(0x1f1)](this['moveSynchTarget']());if(_0x3ad33e)return _0x3ad33e['realMoveSpeed']();}}else return this[_0x1b8420(0x456)]();},Sprite_Character[_0x303df0(0x2e5)][_0x303df0(0x5a5)]=function(){const _0x5c5492=_0x303df0,_0x2454f7=this[_0x5c5492(0x395)][_0x5c5492(0x5a9)]();let _0x49b58f=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this['_character'][_0x5c5492(0x615)]&&(_0x49b58f=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x49b58f[_0x2454f7]-0x2)/0x2;},Sprite_Character[_0x303df0(0x2e5)]['characterPatternYBasic']=function(){const _0xd4d607=_0x303df0;let _0x28e4af=this[_0xd4d607(0x395)]['direction']();if(this['_character'][_0xd4d607(0x615)]){if(_0x28e4af===0x4){if(_0xd4d607(0x642)==='Fxysj')return this[_0xd4d607(0x474)]['type'];else _0x28e4af=0x6;}else{if(_0x28e4af===0x6){if(_0xd4d607(0x4bd)!==_0xd4d607(0x4bd)){if(this[_0xd4d607(0x383)]===_0xe0e397)this[_0xd4d607(0x348)]();const _0x151c91=_0xd4d607(0x67c)[_0xd4d607(0x660)](_0x3653e2,_0x2c1ea7);delete this[_0xd4d607(0x383)][_0x151c91];}else _0x28e4af=0x4;}}}return(_0x28e4af-0x2)/0x2;},Sprite_Character[_0x303df0(0x2e5)][_0x303df0(0x2ad)]=function(){const _0x1716ab=_0x303df0;this['rotation']=0x0;if(this[_0x1716ab(0x554)]()){const _0x39be67=VisuMZ[_0x1716ab(0x28b)][_0x1716ab(0x578)]['Movement'],_0x18e9e0=this[_0x1716ab(0x395)][_0x1716ab(0x5a9)]();let _0x3f3d95=0x0;if([0x1,0x4,0x7]['includes'](_0x18e9e0))_0x3f3d95=_0x39be67[_0x1716ab(0x35c)];if([0x3,0x6,0x9]['includes'](_0x18e9e0))_0x3f3d95=_0x39be67[_0x1716ab(0x516)];[0x2,0x8][_0x1716ab(0x37c)](_0x18e9e0)&&(_0x3f3d95=[-_0x39be67['TiltVert'],0x0,_0x39be67['TiltVert']][this['_character'][_0x1716ab(0x5cf)]()]);if(this[_0x1716ab(0x190)])_0x3f3d95*=-0x1;this['rotation']=_0x3f3d95;}},Sprite_Character[_0x303df0(0x2e5)][_0x303df0(0x554)]=function(){const _0x106623=_0x303df0;if(this['_dragonbones'])return![];return this[_0x106623(0x395)]['isDashingAndMoving']()&&!this[_0x106623(0x395)][_0x106623(0x541)]()&&!this[_0x106623(0x395)]['isPosing']()&&this[_0x106623(0x2d3)]()===0x0;},Sprite_Character[_0x303df0(0x2e5)]['updateShadow']=function(){const _0x164574=_0x303df0;this['_shadowSprite']['x']=this[_0x164574(0x395)][_0x164574(0x3e1)](),this[_0x164574(0x1ca)]['y']=this[_0x164574(0x395)][_0x164574(0x563)](),this['_shadowSprite'][_0x164574(0x3c7)]=this[_0x164574(0x3c7)],this[_0x164574(0x1ca)][_0x164574(0x593)]=this[_0x164574(0x395)][_0x164574(0x1fb)](),this['_shadowSprite'][_0x164574(0x336)]=this[_0x164574(0x336)];if(!this[_0x164574(0x395)][_0x164574(0x519)]())this[_0x164574(0x1ca)][_0x164574(0x502)]['x']=Math[_0x164574(0x59b)](0x1,this[_0x164574(0x1ca)][_0x164574(0x502)]['x']+0.1),this[_0x164574(0x1ca)]['scale']['y']=Math['min'](0x1,this[_0x164574(0x1ca)][_0x164574(0x502)]['y']+0.1);else{if(_0x164574(0x5dc)===_0x164574(0x5dc))this[_0x164574(0x1ca)][_0x164574(0x502)]['x']=Math[_0x164574(0x399)](0x0,this[_0x164574(0x1ca)][_0x164574(0x502)]['x']-0.1),this[_0x164574(0x1ca)][_0x164574(0x502)]['y']=Math['max'](0x0,this[_0x164574(0x1ca)]['scale']['y']-0.1);else{let _0x546e82=[_0x8b467b,_0x573b45,_0x164574(0x48e)['format'](_0x25b344)];return typeof _0x237f06==='string'&&(_0x546e82=[_0x4351a2,_0x13878d,_0x240759[_0x164574(0x4dc)]()['trim']()]),_0x44a132[_0x164574(0x5a6)](_0x546e82);}}},Sprite_Character['prototype'][_0x303df0(0x59e)]=function(){const _0x4b4cf7=_0x303df0,_0x1b1613=this[_0x4b4cf7(0x1bf)],_0x173172=this['getEventIconIndex']();if(_0x173172<=0x0)return _0x1b1613[_0x4b4cf7(0x611)](0x0,0x0,0x0,0x0);else{const _0x67c620=ImageManager[_0x4b4cf7(0x264)],_0x16c322=ImageManager[_0x4b4cf7(0x414)],_0x588033=_0x173172%0x10*_0x67c620,_0x5e7e75=Math[_0x4b4cf7(0x39c)](_0x173172/0x10)*_0x16c322;_0x1b1613[_0x4b4cf7(0x611)](_0x588033,_0x5e7e75,_0x67c620,_0x16c322),this['visible']=!![];}const _0x2d097f=this[_0x4b4cf7(0x395)][_0x4b4cf7(0x34b)]();if(this[_0x4b4cf7(0x20a)]()){if('OHrmy'!==_0x4b4cf7(0x641))return this[_0x4b4cf7(0x548)]()?this[_0x4b4cf7(0x4a1)]():_0x2e256b[_0x4b4cf7(0x28b)]['Game_CharacterBase_pattern'][_0x4b4cf7(0x249)](this);else this[_0x4b4cf7(0x49b)](_0x1b1613);}else _0x1b1613['x']=_0x2d097f?_0x2d097f[_0x4b4cf7(0x51a)]:0x0,_0x1b1613['y']=_0x2d097f?-this[_0x4b4cf7(0x48f)]+_0x2d097f['bufferY']:0x0;_0x1b1613['blendMode']=_0x2d097f?_0x2d097f['blendMode']:0x0,this['removeChild'](_0x1b1613),this[_0x4b4cf7(0x565)](_0x1b1613),_0x1b1613[_0x4b4cf7(0x632)]=-this['rotation'];},Sprite_Character['prototype'][_0x303df0(0x238)]=function(){const _0x2641e8=_0x303df0;if(!this[_0x2641e8(0x395)])return;if(this['_character'][_0x2641e8(0x4b0)]===undefined)return;if(this[_0x2641e8(0x395)][_0x2641e8(0x4b0)]===![])return;this['z']=this[_0x2641e8(0x395)][_0x2641e8(0x4b0)];if(this['z']<0x0)this[_0x2641e8(0x1ca)]['z']=this['z']-0x1;else{if('FESlw'!==_0x2641e8(0x311)){if(this[_0x2641e8(0x37e)](_0x872176,_0x2a81dc,0x2))return!![];if(this['isPassable'](_0x11712d,_0x319cd0,0x4))return!![];if(this['isPassable'](_0x5674ce,_0x43dcb0,0x6))return!![];if(this['isPassable'](_0xeb0d78,_0xcbc176,0x8))return!![];return![];}else this['_shadowSprite']['z']=0x0;}},Sprite_Character[_0x303df0(0x2e5)][_0x303df0(0x667)]=function(){const _0x4fd019=_0x303df0;if(!this[_0x4fd019(0x395)])return;let _0x4753fe=!!this[_0x4fd019(0x395)]['_mirrorSprite'];this[_0x4fd019(0x502)]['x']=Math[_0x4fd019(0x3f0)](this[_0x4fd019(0x502)]['x'])*(_0x4753fe?-0x1:0x1);},Sprite_Character[_0x303df0(0x2e5)][_0x303df0(0x49b)]=function(_0x2e7c02){const _0x239fec=_0x303df0;_0x2e7c02['x']=0x0,_0x2e7c02['y']=-this[_0x239fec(0x48f)]+this[_0x239fec(0x48f)]*0x2/0x5;if(this[_0x239fec(0x395)]['pattern']()!==0x1){if(_0x239fec(0x3f7)==='pJFCp')return _0x353a92[_0x239fec(0x28b)]['Game_Variables_value'][_0x239fec(0x249)](this,_0x1122dd);else _0x2e7c02['y']+=0x1;}},Sprite_Character[_0x303df0(0x2e5)]['getEventIconIndex']=function(){const _0x30f1c5=_0x303df0;if(!this[_0x30f1c5(0x395)])return 0x0;if(this[_0x30f1c5(0x395)][_0x30f1c5(0x55e)])return 0x0;const _0x2ecb91=this['_character'][_0x30f1c5(0x34b)]();return _0x2ecb91?_0x2ecb91[_0x30f1c5(0x2be)]||0x0:0x0;},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x5e4)]=Sprite_Balloon['prototype'][_0x303df0(0x194)],Sprite_Balloon[_0x303df0(0x2e5)][_0x303df0(0x194)]=function(_0x2f8d2c,_0x260a1e){const _0x1a3638=_0x303df0;VisuMZ['EventsMoveCore'][_0x1a3638(0x5e4)][_0x1a3638(0x249)](this,_0x2f8d2c,_0x260a1e),VisuMZ[_0x1a3638(0x28b)][_0x1a3638(0x578)][_0x1a3638(0x1fd)][_0x1a3638(0x2fb)]&&this[_0x1a3638(0x558)][_0x1a3638(0x395)][_0x1a3638(0x3d9)](_0x260a1e,this[_0x1a3638(0x442)]);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x244)]=Sprite_Balloon[_0x303df0(0x2e5)][_0x303df0(0x445)],Sprite_Balloon['prototype'][_0x303df0(0x445)]=function(){const _0x3ac66a=_0x303df0;VisuMZ['EventsMoveCore'][_0x3ac66a(0x244)]['call'](this),this[_0x3ac66a(0x337)]();},Sprite_Balloon[_0x303df0(0x2e5)][_0x303df0(0x337)]=function(){const _0xc5642a=_0x303df0;this[_0xc5642a(0x558)][_0xc5642a(0x395)][_0xc5642a(0x263)]()&&(_0xc5642a(0x663)!==_0xc5642a(0x48c)?(this['x']+=VisuMZ['EventsMoveCore'][_0xc5642a(0x578)][_0xc5642a(0x1fd)][_0xc5642a(0x636)],this['y']+=VisuMZ[_0xc5642a(0x28b)][_0xc5642a(0x578)][_0xc5642a(0x1fd)][_0xc5642a(0x29e)]):_0x3f2a6e[_0xc5642a(0x28b)][_0xc5642a(0x67e)][_0xc5642a(0x249)](this,_0x8aab9f,_0x3cb6ee));},Sprite_Timer[_0x303df0(0x2e5)][_0x303df0(0x4f3)]=function(){const _0x1f45e9=_0x303df0;this[_0x1f45e9(0x538)]=new Bitmap(Math['round'](Graphics['boxWidth']/0x2),0x30),this[_0x1f45e9(0x538)][_0x1f45e9(0x58f)]=this[_0x1f45e9(0x58f)](),this['bitmap'][_0x1f45e9(0x5a7)]=this[_0x1f45e9(0x5a7)](),this['bitmap'][_0x1f45e9(0x5a3)]=ColorManager[_0x1f45e9(0x5a3)]();},Sprite_Timer[_0x303df0(0x2e5)][_0x303df0(0x184)]=function(){const _0x269f63=_0x303df0,_0xa4100a=Math['floor'](this[_0x269f63(0x32b)]/0x3c/0x3c),_0x24c711=Math[_0x269f63(0x39c)](this[_0x269f63(0x32b)]/0x3c)%0x3c,_0x2f2332=this[_0x269f63(0x32b)]%0x3c;let _0x26071c=_0x24c711[_0x269f63(0x1a1)](0x2)+':'+_0x2f2332[_0x269f63(0x1a1)](0x2);if(_0xa4100a>0x0)_0x26071c=_0x269f63(0x2cc)[_0x269f63(0x660)](_0xa4100a,_0x26071c);return _0x26071c;};function Sprite_EventLabel(){this['initialize'](...arguments);}Sprite_EventLabel[_0x303df0(0x2e5)]=Object[_0x303df0(0x5fa)](Sprite[_0x303df0(0x2e5)]),Sprite_EventLabel['prototype'][_0x303df0(0x278)]=Sprite_EventLabel,Sprite_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x1ff)]=function(_0x22702a){const _0x3d374a=_0x303df0;this[_0x3d374a(0x2bd)]=_0x22702a,Sprite[_0x3d374a(0x2e5)]['initialize'][_0x3d374a(0x249)](this),this[_0x3d374a(0x41c)](),this[_0x3d374a(0x3ed)]();},Sprite_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x41c)]=function(){const _0x7824a1=_0x303df0;this[_0x7824a1(0x351)]['x']=0.5,this[_0x7824a1(0x351)]['y']=0x1;},Sprite_EventLabel[_0x303df0(0x2e5)]['createProxyWindow']=function(){const _0x232dbb=_0x303df0,_0x3b6144=new Rectangle(0x0,0x0,0x1,0x1);this[_0x232dbb(0x5e3)]=new Window_Base(_0x3b6144),this[_0x232dbb(0x5e3)][_0x232dbb(0x246)]=0x0;},Sprite_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x3c1)]=function(){const _0x4fa7f7=_0x303df0;Sprite[_0x4fa7f7(0x2e5)][_0x4fa7f7(0x3c1)]['call'](this),this[_0x4fa7f7(0x590)](),this[_0x4fa7f7(0x5fc)](),this[_0x4fa7f7(0x445)](),this[_0x4fa7f7(0x644)]();},Sprite_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x590)]=function(){const _0x41fd7b=_0x303df0;this['_event'][_0x41fd7b(0x405)]()!==this[_0x41fd7b(0x3e9)]&&(this['_text']=this[_0x41fd7b(0x2bd)]['labelWindowText'](),this[_0x41fd7b(0x4ca)]());},Sprite_EventLabel[_0x303df0(0x2e5)]['refresh']=function(){const _0x18c2f9=_0x303df0;if(!this[_0x18c2f9(0x5e3)])return;this['resizeWindow'](),this[_0x18c2f9(0x393)]();},Sprite_EventLabel['prototype'][_0x303df0(0x43c)]=function(){const _0x1a1a24=_0x303df0,_0x47df0b=this[_0x1a1a24(0x5e3)][_0x1a1a24(0x1c3)](this[_0x1a1a24(0x3e9)]),_0x4fb27e=this['_proxyWindow'][_0x1a1a24(0x542)](),_0x4ed910=_0x47df0b['width']+_0x4fb27e*0x2,_0x410e88=_0x47df0b[_0x1a1a24(0x48f)];this['_proxyWindow'][_0x1a1a24(0x64a)](0x0,0x0,_0x4ed910,_0x410e88),this[_0x1a1a24(0x5e3)][_0x1a1a24(0x3d4)](),this['bitmap']=this[_0x1a1a24(0x5e3)][_0x1a1a24(0x2c3)];},Sprite_EventLabel[_0x303df0(0x2e5)]['drawText']=function(){const _0x3ade72=_0x303df0,_0x5c0309=this['_proxyWindow'][_0x3ade72(0x542)]();this[_0x3ade72(0x5e3)][_0x3ade72(0x568)](this[_0x3ade72(0x3e9)],_0x5c0309,0x0);},Sprite_EventLabel['prototype']['updateScale']=function(){const _0x59cd26=_0x303df0,_0x589111=VisuMZ[_0x59cd26(0x28b)]['Settings'][_0x59cd26(0x417)][_0x59cd26(0x226)],_0x188e5e=$gameSystem[_0x59cd26(0x3d1)]()||0x1;this[_0x59cd26(0x502)]['x']=this[_0x59cd26(0x502)]['y']=_0x589111/_0x188e5e;},Sprite_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x445)]=function(){const _0x4d43bd=_0x303df0;if(!SceneManager[_0x4d43bd(0x53a)])return;if(!SceneManager[_0x4d43bd(0x53a)][_0x4d43bd(0x295)])return;const _0x3654f5=SceneManager['_scene']['_spriteset'][_0x4d43bd(0x302)](this[_0x4d43bd(0x2bd)]);if(!_0x3654f5)return;this['x']=this[_0x4d43bd(0x2bd)][_0x4d43bd(0x3ab)](),this['x']+=this[_0x4d43bd(0x2bd)][_0x4d43bd(0x668)][_0x4d43bd(0x301)],this['y']=this[_0x4d43bd(0x2bd)][_0x4d43bd(0x397)]()-_0x3654f5[_0x4d43bd(0x48f)],this['y']+=$gameSystem[_0x4d43bd(0x439)]()*-0.5,this['y']+=this['_event'][_0x4d43bd(0x668)][_0x4d43bd(0x21d)];},Sprite_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x644)]=function(){const _0x12e1c2=_0x303df0;if(this[_0x12e1c2(0x323)]())this[_0x12e1c2(0x3c7)]+=this[_0x12e1c2(0x598)]();else SceneManager[_0x12e1c2(0x53a)][_0x12e1c2(0x3d5)]>0x0?this[_0x12e1c2(0x3c7)]=0x0:this[_0x12e1c2(0x3c7)]-=this['opacitySpeed']();},Sprite_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x323)]=function(){const _0xc3a75f=_0x303df0;if(!$gameSystem[_0xc3a75f(0x4da)]())return![];if(this[_0xc3a75f(0x2bd)]?.[_0xc3a75f(0x55e)])return![];if(SceneManager[_0xc3a75f(0x53a)][_0xc3a75f(0x3d5)]>0x0)return![];const _0x4226a2=$gamePlayer['x'],_0x217f25=$gamePlayer['y'],_0x4068a1=this[_0xc3a75f(0x2bd)]['x'],_0x2432ef=this[_0xc3a75f(0x2bd)]['y'];if(this['_visiblePlayerX']===_0x4226a2&&this['_visiblePlayerY']===_0x217f25&&this['_visibleEventX']===_0x4068a1&&this[_0xc3a75f(0x39e)]===_0x2432ef){if(_0xc3a75f(0x1a5)!==_0xc3a75f(0x24b))return this[_0xc3a75f(0x25f)];else{const _0xee3f77=this[_0xc3a75f(0x4fd)],_0x15654c=this[_0xc3a75f(0x250)];return this[_0xc3a75f(0x1ec)](_0xee3f77,_0x15654c);}}this[_0xc3a75f(0x462)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0xc3a75f(0x18c)]=this[_0xc3a75f(0x2bd)]['x'],this[_0xc3a75f(0x39e)]=this[_0xc3a75f(0x2bd)]['y'];if($gameMap['absDistance'](_0x4226a2,_0x217f25,_0x4068a1,_0x2432ef)>this[_0xc3a75f(0x2bd)][_0xc3a75f(0x19f)]())return this['_cacheVisibility']=![],![];return this[_0xc3a75f(0x25f)]=!![],!![];},Sprite_EventLabel[_0x303df0(0x2e5)]['opacitySpeed']=function(){const _0x1ce512=_0x303df0;return VisuMZ[_0x1ce512(0x28b)]['Settings']['Label'][_0x1ce512(0x3e4)];},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x4bb)]=Spriteset_Map[_0x303df0(0x2e5)]['createLowerLayer'],Spriteset_Map['prototype'][_0x303df0(0x3f2)]=function(){const _0x4cba75=_0x303df0;VisuMZ[_0x4cba75(0x28b)][_0x4cba75(0x4bb)][_0x4cba75(0x249)](this),this[_0x4cba75(0x2b4)]();},VisuMZ[_0x303df0(0x28b)]['Spriteset_Map_createShadow']=Spriteset_Map[_0x303df0(0x2e5)]['createShadow'],Spriteset_Map[_0x303df0(0x2e5)][_0x303df0(0x29b)]=function(){const _0x5c0999=_0x303df0;VisuMZ[_0x5c0999(0x28b)][_0x5c0999(0x26c)][_0x5c0999(0x249)](this),this[_0x5c0999(0x422)]();},Spriteset_Map[_0x303df0(0x2e5)][_0x303df0(0x422)]=function(){const _0x56870d=_0x303df0;if(!VisuMZ[_0x56870d(0x28b)][_0x56870d(0x578)][_0x56870d(0x3bf)][_0x56870d(0x537)])return;for(const _0x4652a8 of this[_0x56870d(0x433)]){this['createCharacterShadow'](_0x4652a8);}},Spriteset_Map[_0x303df0(0x2e5)][_0x303df0(0x49f)]=function(_0xb5de82){const _0x24f64b=_0x303df0;_0xb5de82['_shadowSprite']=new Sprite(),_0xb5de82[_0x24f64b(0x1ca)][_0x24f64b(0x350)]=_0xb5de82[_0x24f64b(0x395)][_0x24f64b(0x251)](),_0xb5de82['_shadowSprite'][_0x24f64b(0x538)]=ImageManager[_0x24f64b(0x57b)](_0xb5de82[_0x24f64b(0x1ca)]['_filename']),_0xb5de82['_shadowSprite'][_0x24f64b(0x351)]['x']=0.5,_0xb5de82[_0x24f64b(0x1ca)][_0x24f64b(0x351)]['y']=0x1,_0xb5de82['_shadowSprite']['z']=0x0,this[_0x24f64b(0x56b)]['addChild'](_0xb5de82[_0x24f64b(0x1ca)]);},Spriteset_Map[_0x303df0(0x2e5)][_0x303df0(0x683)]=function(){const _0x7be48d=_0x303df0;if(!VisuMZ[_0x7be48d(0x28b)][_0x7be48d(0x578)][_0x7be48d(0x3bf)]['ShowShadows'])return;for(const _0x459d09 of this[_0x7be48d(0x433)]){this[_0x7be48d(0x56b)][_0x7be48d(0x64f)](_0x459d09[_0x7be48d(0x1ca)]);}},Spriteset_Map[_0x303df0(0x2e5)][_0x303df0(0x2b4)]=function(){const _0x456ab3=_0x303df0;this[_0x456ab3(0x2ce)]=[];for(const _0x2e85f1 of $gameMap[_0x456ab3(0x659)]()){this[_0x456ab3(0x3af)](_0x2e85f1);}},Spriteset_Map[_0x303df0(0x2e5)]['createLabelWindowForTarget']=function(_0x29974e){const _0x12b39b=_0x303df0;if(!this[_0x12b39b(0x313)](_0x29974e))return;let _0x13c0ed;const _0x56ce28=VisuMZ['EventsMoveCore']['Settings'][_0x12b39b(0x417)][_0x12b39b(0x572)]??!![];_0x13c0ed=_0x56ce28?new Sprite_EventLabel(_0x29974e):new Window_EventLabel(_0x29974e),_0x13c0ed['z']=0x8,_0x13c0ed['spriteId']=Sprite['_counter']++,this['_tilemap'][_0x12b39b(0x565)](_0x13c0ed),this['_labelWindows'][_0x12b39b(0x1bc)](_0x13c0ed);},Spriteset_Map[_0x303df0(0x2e5)][_0x303df0(0x313)]=function(_0x359b80){const _0x934408=_0x303df0,_0x46a630=_0x359b80[_0x934408(0x5db)]();if(_0x46a630[_0x934408(0x5bd)][_0x934408(0x5bf)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x46a630['note'][_0x934408(0x5bf)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x196add of _0x46a630['pages']){if(_0x934408(0x3bd)===_0x934408(0x3bd)){let _0xb823a6='';for(const _0x221ce3 of _0x196add[_0x934408(0x341)]){[0x6c,0x198]['includes'](_0x221ce3['code'])&&(_0xb823a6+=_0x221ce3['parameters'][0x0]);}if(_0xb823a6[_0x934408(0x5bf)](/<LABEL:[ ](.*?)>/i))return!![];if(_0xb823a6[_0x934408(0x5bf)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return _0x934408(0x3cd)!=='ccsZC'?this[_0x934408(0x1d0)]():!![];}else{_0x3a73b7[_0x934408(0x64e)](_0x1db5bd,_0x3d96cf);const _0xb20bfc=_0x484c9f['getLastPluginCommandInterpreter'](),_0x192604={'mapId':_0x3c95fc[_0x934408(0x463)],'eventId':_0x2cb543[_0x934408(0x353)]||_0xb20bfc[_0x934408(0x68d)](),'pageId':_0x12bb8d[_0x934408(0x1e7)]};if(_0x192604[_0x934408(0x2c6)]<=0x0)_0x192604[_0x934408(0x2c6)]=_0x1dcde0?_0x55846c['mapId']():0x1;_0x2f567c[_0x934408(0x2bb)]()[_0x934408(0x343)](_0x192604);}}return![];},Spriteset_Map[_0x303df0(0x2e5)]['createSpawnedEvent']=function(_0x2b2b3d){const _0x576767=_0x303df0;this[_0x576767(0x433)]=this[_0x576767(0x433)]||[];const _0x37c01b=new Sprite_Character(_0x2b2b3d);this[_0x576767(0x433)][_0x576767(0x1bc)](_0x37c01b),this[_0x576767(0x56b)]['addChild'](_0x37c01b),this[_0x576767(0x49f)](_0x37c01b),this[_0x576767(0x3af)](_0x2b2b3d),_0x37c01b['update']();},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x34a)]=Game_Message[_0x303df0(0x2e5)][_0x303df0(0x539)],Game_Message['prototype'][_0x303df0(0x539)]=function(_0x29eb99,_0x43adb4){const _0x57dffc=_0x303df0;this[_0x57dffc(0x587)]=$gameTemp['getSelfTarget'](),VisuMZ[_0x57dffc(0x28b)][_0x57dffc(0x34a)][_0x57dffc(0x249)](this,_0x29eb99,_0x43adb4);},VisuMZ['EventsMoveCore'][_0x303df0(0x5f3)]=Window_NumberInput['prototype'][_0x303df0(0x2ee)],Window_NumberInput[_0x303df0(0x2e5)]['start']=function(){const _0x10a951=_0x303df0;$gameTemp['registerSelfTarget']($gameMessage[_0x10a951(0x587)]),VisuMZ[_0x10a951(0x28b)][_0x10a951(0x5f3)][_0x10a951(0x249)](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x22e)]=Window_NumberInput['prototype']['processOk'],Window_NumberInput['prototype'][_0x303df0(0x199)]=function(){const _0x45c302=_0x303df0;$gameTemp[_0x45c302(0x627)]($gameMessage[_0x45c302(0x587)]),VisuMZ['EventsMoveCore'][_0x45c302(0x22e)][_0x45c302(0x249)](this),$gameTemp[_0x45c302(0x38e)](),$gameMessage[_0x45c302(0x587)]=undefined;},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x458)]=Game_Message[_0x303df0(0x2e5)][_0x303df0(0x5c5)],Game_Message['prototype'][_0x303df0(0x5c5)]=function(_0x6009da,_0x248e60){const _0x9894ad=_0x303df0;this['_selfTargetItemChoice']=$gameTemp[_0x9894ad(0x47f)](),VisuMZ[_0x9894ad(0x28b)][_0x9894ad(0x458)][_0x9894ad(0x249)](this,_0x6009da,_0x248e60);},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x5fd)]=Window_EventItem[_0x303df0(0x2e5)]['onOk'],Window_EventItem[_0x303df0(0x2e5)][_0x303df0(0x289)]=function(){const _0x9b935a=_0x303df0;$gameTemp['registerSelfTarget']($gameMessage[_0x9b935a(0x457)]),VisuMZ[_0x9b935a(0x28b)][_0x9b935a(0x5fd)][_0x9b935a(0x249)](this),$gameTemp[_0x9b935a(0x38e)](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x318)]=Window_EventItem[_0x303df0(0x2e5)][_0x303df0(0x520)],Window_EventItem[_0x303df0(0x2e5)][_0x303df0(0x520)]=function(){const _0x19763=_0x303df0;$gameTemp[_0x19763(0x627)]($gameMessage['_selfTargetItemChoice']),VisuMZ[_0x19763(0x28b)][_0x19763(0x318)][_0x19763(0x249)](this),$gameTemp[_0x19763(0x38e)](),$gameMessage[_0x19763(0x457)]=undefined;},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x193)]=Window_Message[_0x303df0(0x2e5)][_0x303df0(0x254)],Window_Message[_0x303df0(0x2e5)][_0x303df0(0x254)]=function(){const _0x2340f3=_0x303df0;$gameMessage['registerSelfEvent'](),VisuMZ['EventsMoveCore'][_0x2340f3(0x193)][_0x2340f3(0x249)](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x303df0(0x28b)][_0x303df0(0x2e1)]=Window_ScrollText[_0x303df0(0x2e5)]['startMessage'],Window_ScrollText[_0x303df0(0x2e5)][_0x303df0(0x254)]=function(){const _0x370abc=_0x303df0;$gameMessage['registerSelfEvent'](),VisuMZ[_0x370abc(0x28b)]['Window_ScrollText_startMessage'][_0x370abc(0x249)](this),$gameTemp[_0x370abc(0x38e)]();};function Window_EventLabel(){const _0x2c4f81=_0x303df0;this[_0x2c4f81(0x1ff)](...arguments);}Window_EventLabel['prototype']=Object[_0x303df0(0x5fa)](Window_Base[_0x303df0(0x2e5)]),Window_EventLabel[_0x303df0(0x2e5)]['constructor']=Window_EventLabel,Window_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x1ff)]=function(_0x1254aa){const _0x4c0f9b=_0x303df0;this[_0x4c0f9b(0x2bd)]=_0x1254aa;const _0x3781b1=new Rectangle(0x0,0x0,Graphics[_0x4c0f9b(0x4b5)]/0x4,this[_0x4c0f9b(0x59c)](0x1));this['initMembers'](),Window_Base[_0x4c0f9b(0x2e5)][_0x4c0f9b(0x1ff)][_0x4c0f9b(0x249)](this,_0x3781b1),this[_0x4c0f9b(0x4f1)]=0x0,this[_0x4c0f9b(0x60e)](0x2),this['_text']='';},Window_EventLabel['prototype'][_0x303df0(0x41c)]=function(){const _0x4fe3f5=_0x303df0;this[_0x4fe3f5(0x2a7)]=![],this['_screenZoomScale']=$gameScreen[_0x4fe3f5(0x617)](),this['_eventScreenX']=this['_event'][_0x4fe3f5(0x3ab)](),this[_0x4fe3f5(0x4c5)]=this[_0x4fe3f5(0x2bd)][_0x4fe3f5(0x397)](),this['_eventLabelOffsetX']=this[_0x4fe3f5(0x2bd)][_0x4fe3f5(0x668)][_0x4fe3f5(0x301)],this['_eventLabelOffsetY']=this[_0x4fe3f5(0x2bd)][_0x4fe3f5(0x668)][_0x4fe3f5(0x21d)],this[_0x4fe3f5(0x5eb)]=this['_event'][_0x4fe3f5(0x3a1)],this[_0x4fe3f5(0x25f)]=this[_0x4fe3f5(0x323)](),this['_cacheSystemVisible']=$gameSystem['eventLabelsVisible'](),this[_0x4fe3f5(0x462)]=$gamePlayer['x'],this[_0x4fe3f5(0x562)]=$gamePlayer['y'],this[_0x4fe3f5(0x18c)]=this['_event']['x'],this[_0x4fe3f5(0x39e)]=this['_event']['y'];},Window_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x3c1)]=function(){const _0x557b7d=_0x303df0;Window_Base[_0x557b7d(0x2e5)][_0x557b7d(0x3c1)]['call'](this);if(!this[_0x557b7d(0x210)]())return;this['updateText'](),this[_0x557b7d(0x5fc)](),this[_0x557b7d(0x445)](),this[_0x557b7d(0x644)]();},Window_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x210)]=function(){const _0x1895a2=_0x303df0;if(!this[_0x1895a2(0x2bd)])return![];if(!this[_0x1895a2(0x2bd)][_0x1895a2(0x668)])return![];if(this[_0x1895a2(0x5eb)]!==this[_0x1895a2(0x2bd)][_0x1895a2(0x3a1)])return!![];if(this[_0x1895a2(0x2bd)][_0x1895a2(0x55e)]&&!this[_0x1895a2(0x2a7)])return!![];if(this['_event'][_0x1895a2(0x668)]['text']==='')return![];if(this[_0x1895a2(0x346)]!==$gameScreen[_0x1895a2(0x617)]())return!![];if(this[_0x1895a2(0x26e)]!==this[_0x1895a2(0x2bd)][_0x1895a2(0x3ab)]())return!![];if(this[_0x1895a2(0x4c5)]!==this[_0x1895a2(0x2bd)]['screenY']())return!![];if(this[_0x1895a2(0x4f0)]!==this[_0x1895a2(0x2bd)]['_labelWindow']['offsetX'])return!![];if(this[_0x1895a2(0x4aa)]!==this[_0x1895a2(0x2bd)][_0x1895a2(0x668)][_0x1895a2(0x21d)])return!![];if(this['_visiblePlayerX']!==$gamePlayer['x'])return!![];if(this['_visiblePlayerY']!==$gamePlayer['y'])return!![];if(this[_0x1895a2(0x18c)]!==this[_0x1895a2(0x2bd)]['x'])return!![];if(this[_0x1895a2(0x39e)]!==this[_0x1895a2(0x2bd)]['y'])return!![];if(this[_0x1895a2(0x3ea)]!==$gameSystem[_0x1895a2(0x4da)]())return!![];if(this[_0x1895a2(0x25f)]&&this['contentsOpacity']<0xff)return!![];if(!this['_cacheVisibility']&&this['contentsOpacity']>0x0)return!![];if(SceneManager[_0x1895a2(0x53a)][_0x1895a2(0x3d5)]>0x0)return!![];return![];},Window_EventLabel[_0x303df0(0x2e5)]['updateText']=function(){const _0x53384a=_0x303df0;if(this[_0x53384a(0x2bd)][_0x53384a(0x405)]()!==this[_0x53384a(0x3e9)]){if(_0x53384a(0x4c9)!==_0x53384a(0x4c9)){const _0x5dbeb0=this[_0x53384a(0x34b)]();if(!_0x5dbeb0)return![];return _0x5dbeb0[_0x53384a(0x2be)]>0x0;}else this[_0x53384a(0x3e9)]=this[_0x53384a(0x2bd)][_0x53384a(0x405)](),this[_0x53384a(0x4ca)]();}},Window_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x5fc)]=function(){const _0x205bc3=_0x303df0;this['scale']['x']=0x1/$gameScreen['zoomScale'](),this[_0x205bc3(0x502)]['y']=0x1/$gameScreen[_0x205bc3(0x617)](),this['_screenZoomScale']=$gameScreen[_0x205bc3(0x617)]();},Window_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x445)]=function(){const _0x259581=_0x303df0;if(!SceneManager[_0x259581(0x53a)])return;if(!SceneManager[_0x259581(0x53a)]['_spriteset'])return;const _0x3d8d04=SceneManager[_0x259581(0x53a)]['_spriteset'][_0x259581(0x302)](this['_event']);if(!_0x3d8d04)return;this['x']=Math['round'](this[_0x259581(0x2bd)][_0x259581(0x3ab)]()-Math['floor'](this[_0x259581(0x2f2)]*this[_0x259581(0x502)]['x']/0x2)),this['x']+=this['_event'][_0x259581(0x668)][_0x259581(0x301)],this['y']=this[_0x259581(0x2bd)][_0x259581(0x397)]()-_0x3d8d04['height'],this['y']+=Math[_0x259581(0x4eb)]($gameSystem[_0x259581(0x439)]()*0.5),this['y']-=Math[_0x259581(0x4eb)](this[_0x259581(0x48f)]*this['scale']['y']),this['y']+=this['_event']['_labelWindow'][_0x259581(0x21d)],this[_0x259581(0x2a7)]=this[_0x259581(0x2bd)][_0x259581(0x55e)],this['_eventScreenX']=this['_event']['screenX'](),this[_0x259581(0x4c5)]=this[_0x259581(0x2bd)][_0x259581(0x397)](),this[_0x259581(0x4f0)]=this[_0x259581(0x2bd)][_0x259581(0x668)][_0x259581(0x301)],this[_0x259581(0x4aa)]=this['_event'][_0x259581(0x668)][_0x259581(0x21d)],this['_eventPageIndex']=this[_0x259581(0x2bd)][_0x259581(0x3a1)],this[_0x259581(0x2a7)]&&(_0x259581(0x602)==='ZaOoh'?this[_0x259581(0x4f1)]=0x0:(this[_0x259581(0x2ed)]=!![],this[_0x259581(0x37f)]=![]));},Window_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x644)]=function(){const _0x4e6408=_0x303df0;if(this['isLabelVisible']())this[_0x4e6408(0x4f1)]+=this[_0x4e6408(0x598)]();else SceneManager[_0x4e6408(0x53a)][_0x4e6408(0x3d5)]>0x0?this[_0x4e6408(0x4f1)]=0x0:_0x4e6408(0x5be)!=='OjTPF'?this[_0x4e6408(0x4f1)]-=this[_0x4e6408(0x598)]():(_0xc30d74[_0x4e6408(0x28b)]['Game_Event_locate']['call'](this,_0x28438d,_0xaccd2e),this[_0x4e6408(0x4fd)]=_0x380d92,this[_0x4e6408(0x250)]=_0xef168e);},Window_EventLabel[_0x303df0(0x2e5)]['isLabelVisible']=function(){const _0xaae81c=_0x303df0;if(!$gameSystem[_0xaae81c(0x4da)]())return![];if(this['_event']?.[_0xaae81c(0x55e)])return![];if(SceneManager[_0xaae81c(0x53a)][_0xaae81c(0x3d5)]>0x0)return![];const _0x3fca4f=$gamePlayer['x'],_0x240684=$gamePlayer['y'],_0x30877f=this[_0xaae81c(0x2bd)]['x'],_0x5cef3b=this[_0xaae81c(0x2bd)]['y'];if(this[_0xaae81c(0x462)]===_0x3fca4f&&this['_visiblePlayerY']===_0x240684&&this[_0xaae81c(0x18c)]===_0x30877f&&this['_visibleEventY']===_0x5cef3b){if(_0xaae81c(0x4ae)==='QuQWL'){_0x3473c5=_0x41af84['toUpperCase']()[_0xaae81c(0x573)]();const _0x5763d6=_0x395cbf[_0xaae81c(0x203)][_0x15be24];if(!_0x5763d6)return;const _0x5ab0f2=_0x5763d6['MapID'],_0x502e6d=_0x5763d6[_0xaae81c(0x1b6)];if(!this[_0xaae81c(0x25e)](_0x5ab0f2,_0x502e6d))return;if(!_0x162ab1)_0x5763d6['PreMorphJS'][_0xaae81c(0x249)](this,_0x5ab0f2,_0x502e6d,this);this[_0xaae81c(0x5af)](_0x5ab0f2,_0x502e6d,_0x249d55);if(!_0xa4ee2c)_0x5763d6[_0xaae81c(0x438)][_0xaae81c(0x249)](this,_0x5ab0f2,_0x502e6d,this);if(_0x1b11e7)_0x2a6436[_0xaae81c(0x629)]();}else return this['_cacheVisibility'];}this['_visiblePlayerX']=$gamePlayer['x'],this[_0xaae81c(0x562)]=$gamePlayer['y'],this['_visibleEventX']=this[_0xaae81c(0x2bd)]['x'],this[_0xaae81c(0x39e)]=this[_0xaae81c(0x2bd)]['y'];if($gameMap['absDistance'](_0x3fca4f,_0x240684,_0x30877f,_0x5cef3b)>this[_0xaae81c(0x2bd)]['labelWindowRange']())return this['_cacheVisibility']=![],![];return this[_0xaae81c(0x25f)]=!![],!![];},Window_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x598)]=function(){const _0x16dea1=_0x303df0;return VisuMZ[_0x16dea1(0x28b)]['Settings'][_0x16dea1(0x417)]['OpacitySpeed'];},Window_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x43c)]=function(){const _0x4c5f81=_0x303df0,_0xcdc7b8=this[_0x4c5f81(0x1c3)](this[_0x4c5f81(0x3e9)]);this[_0x4c5f81(0x2f2)]=_0xcdc7b8['width']+($gameSystem['windowPadding']()+this[_0x4c5f81(0x542)]())*0x2,this[_0x4c5f81(0x48f)]=Math[_0x4c5f81(0x399)](this[_0x4c5f81(0x51b)](),_0xcdc7b8[_0x4c5f81(0x48f)])+$gameSystem['windowPadding']()*0x2,this['createContents']();},Window_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x51b)]=function(){const _0x260cd4=_0x303df0;return VisuMZ[_0x260cd4(0x28b)]['Settings'][_0x260cd4(0x417)]['LineHeight'];},Window_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x591)]=function(){const _0x22d376=_0x303df0;Window_Base['prototype'][_0x22d376(0x591)][_0x22d376(0x249)](this),this['contents']['fontSize']=this[_0x22d376(0x1fc)]();},Window_EventLabel[_0x303df0(0x2e5)]['defaultFontSize']=function(){const _0x1c5180=_0x303df0;return VisuMZ['EventsMoveCore'][_0x1c5180(0x578)][_0x1c5180(0x417)][_0x1c5180(0x226)];},Window_EventLabel[_0x303df0(0x2e5)]['refresh']=function(){const _0x5f56d8=_0x303df0;this[_0x5f56d8(0x43c)](),this[_0x5f56d8(0x2c3)][_0x5f56d8(0x545)]();const _0x5c0ee1=this[_0x5f56d8(0x3e9)][_0x5f56d8(0x646)](/[\r\n]+/);let _0x5987b8=0x0;for(const _0x118058 of _0x5c0ee1){const _0x22f562=this['textSizeEx'](_0x118058),_0x408ef1=Math['floor']((this['innerWidth']-_0x22f562['width'])/0x2);this['drawTextEx'](_0x118058,_0x408ef1,_0x5987b8),_0x5987b8+=_0x22f562[_0x5f56d8(0x48f)];}},Window_EventLabel[_0x303df0(0x2e5)]['processDrawIcon']=function(_0x39a856,_0x3ba6ae){const _0x5bb1bb=_0x303df0;_0x3ba6ae[_0x5bb1bb(0x5a2)]&&this[_0x5bb1bb(0x5c6)](_0x39a856,_0x3ba6ae['x']+0x2,_0x3ba6ae['y']),_0x3ba6ae['x']+=Math[_0x5bb1bb(0x59b)](this[_0x5bb1bb(0x4ee)](),ImageManager['iconWidth'])+0x4;},Window_EventLabel[_0x303df0(0x2e5)][_0x303df0(0x5c6)]=function(_0x2e1441,_0x5e1ee0,_0x371d37){const _0x554ec8=_0x303df0,_0x1f88f7=ImageManager[_0x554ec8(0x57b)]('IconSet'),_0x1e38ae=ImageManager[_0x554ec8(0x264)],_0x54e9cd=ImageManager['iconHeight'],_0x3c3519=_0x2e1441%0x10*_0x1e38ae,_0x5ea605=Math['floor'](_0x2e1441/0x10)*_0x54e9cd,_0x3d4b1d=Math[_0x554ec8(0x59b)](this['iconSize']()),_0x218b25=Math[_0x554ec8(0x59b)](this[_0x554ec8(0x4ee)]());this['contents']['blt'](_0x1f88f7,_0x3c3519,_0x5ea605,_0x1e38ae,_0x54e9cd,_0x5e1ee0,_0x371d37,_0x3d4b1d,_0x218b25);},Window_EventLabel['prototype'][_0x303df0(0x4ee)]=function(){const _0x58c275=_0x303df0;return VisuMZ[_0x58c275(0x28b)][_0x58c275(0x578)][_0x58c275(0x417)][_0x58c275(0x459)];};