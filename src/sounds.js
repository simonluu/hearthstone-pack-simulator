import commonTurnOver from './sounds/card_turn_over_normal.ogg';
import rareTurnOver from './sounds/card_turn_over_normal.ogg';
import epicTurnOver from './sounds/card_turn_over_epic.ogg';
import legendaryTurnOver from './sounds/card_turn_over_legendary.ogg';
import packAura from './sounds/unopened_pack_aura_lp.ogg';
import packOpen from './sounds/pack_open.mp4';
import packGrab from './sounds/unopened_pack_grab_1.ogg';
import packDrop from './sounds/unopened_pack_drop_1.ogg';
import cardRare from './sounds/VO_ANNOUNCER_RARE_27.ogg';
import cardEpic from './sounds/VO_ANNOUNCER_EPIC_26.ogg';
import cardLegendary from './sounds/VO_ANNOUNCER_LEGENDARY_25.ogg';
import goldenCommon from './sounds/VO_ANNOUNCER_FOIL_C_29.ogg';
import goldenRare from './sounds/VO_ANNOUNCER_FOIL_R_30.ogg';
import goldenEpic from './sounds/VO_ANNOUNCER_FOIL_E_31.ogg';
import goldenLegendary from './sounds/VO_ANNOUNCER_FOIL_L_32.ogg';
import mouseOver from './sounds/card_mouse_over.ogg';
import mouseAway from './sounds/card_mouse_away.ogg';
import doneAppear from './sounds/floating_button_appears.ogg';
import doneMouseOver from './sounds/floating_button_mouseover.ogg';
import donePress from './sounds/floating_button_press.ogg';

// turn over sounds
export const common_turn_over = new Audio(commonTurnOver);
export const rare_turn_over = new Audio(rareTurnOver);
export const epic_turn_over = new Audio(epicTurnOver);
export const legendary_turn_over = new Audio(legendaryTurnOver);

// unopened pack
export const aura = new Audio(packAura);

// pack sounds
export const pack_open = packOpen;
export const pack_grab = new Audio(packGrab);
export const pack_drop = new Audio(packDrop);

// uncover sounds
export const rare = new Audio(cardRare);
export const epic = new Audio(cardEpic);
export const legendary = new Audio(cardLegendary);
export const golden_common = new Audio(goldenCommon);
export const golden_rare = new Audio(goldenRare);
export const golden_epic = new Audio(goldenEpic);
export const golden_legendary = new Audio(goldenLegendary);

// card hover in and out
export const mouse_over = new Audio(mouseOver);
export const mouse_away = new Audio(mouseAway);

// done button
export const done_appear = new Audio(doneAppear);
export const done_mouseover = new Audio(doneMouseOver);
export const done_press = new Audio(donePress);