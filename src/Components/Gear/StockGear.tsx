import { Button, Dialog, DialogTitle, styled } from "@mui/material";
import { STR } from "../Attributes/AttribPanel";
import { D4, D6, D8 } from "../Dice";
import { GEAR_ARMOR, GEAR_DODGE, GEAR_MELEE_DAMAGE, GEAR_PARRY, GEAR_SHOOTING_DAMAGE, GEAR_THROWING_DAMAGE, GearType } from "./GearData";
import { useContext } from "react";
import { AppContext } from "../AppContextProvider";
import { grey } from "@mui/material/colors";

export const allStockGear: Array<GearType> = [
  {
    name: "Axe, Hand",
    effects: [
      {
        typeName: GEAR_MELEE_DAMAGE,
        values: [
          {
            diceName: D6,
            quantity: 1
          },
          STR
        ]
      },
      {
        typeName: GEAR_THROWING_DAMAGE,
        values: [
          {
            diceName: D6,
            quantity: 1
          },
          STR
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Axe, Battle",
    effects: [
      {
        typeName: GEAR_MELEE_DAMAGE,
        values: [
          {
            diceName: D6,
            quantity: 1
          },
          STR
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Axe, Great",
    effects: [
      {
        typeName: GEAR_MELEE_DAMAGE,
        values: [
          {
            diceName: D6,
            quantity: 1
          },
          STR
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Club, Light",
    effects: [
      {
        typeName: GEAR_MELEE_DAMAGE,
        values: [
          {
            diceName: D4,
            quantity: 1
          },
          STR
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Club, Heavy",
    effects: [
      {
        typeName: GEAR_MELEE_DAMAGE,
        values: [
          {
            diceName: D6,
            quantity: 1
          },
          STR
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Cutlass",
    effects: [
      {
        typeName: GEAR_MELEE_DAMAGE,
        values: [
          {
            diceName: D6,
            quantity: 1
          },
          STR
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Dagger",
    effects: [
      {
        typeName: GEAR_MELEE_DAMAGE,
        values: [
          {
            diceName: D4,
            quantity: 1
          },
          STR
        ]
      },
      {
        typeName: GEAR_THROWING_DAMAGE,
        values: [
          {
            diceName: D4,
            quantity: 1
          },
          STR
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Hands",
    effects: [
      {
        typeName: GEAR_MELEE_DAMAGE,
        values: [
          STR
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Sword, Long",
    effects: [
      {
        typeName: GEAR_MELEE_DAMAGE,
        values: [
          {
            diceName: D8,
            quantity: 1
          },
          STR
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Bow, Long",
    effects: [
      {
        typeName: GEAR_SHOOTING_DAMAGE,
        values: [
          {
            diceName: D6,
            quantity: 2
          },
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Bow, Short",
    effects: [
      {
        typeName: GEAR_SHOOTING_DAMAGE,
        values: [
          {
            diceName: D6,
            quantity: 2
          },
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Crossbow, Light",
    effects: [
      {
        typeName: GEAR_SHOOTING_DAMAGE,
        values: [
          {
            diceName: D6,
            quantity: 2
          },
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Crossbow, Heavy",
    effects: [
      {
        typeName: GEAR_SHOOTING_DAMAGE,
        values: [
          {
            diceName: D6,
            quantity: 2
          },
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Armor, Cloth",
    effects: [
      {
        typeName: GEAR_ARMOR,
        values: [
          1
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Armor, Leather",
    effects: [
      {
        typeName: GEAR_ARMOR,
        values: [
          2
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Armor, Medium",
    effects: [
      {
        typeName: GEAR_ARMOR,
        values: [
          3
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Armor, Heavy",
    effects: [
      {
        typeName: GEAR_ARMOR,
        values: [
          4
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Shield, Small",
    effects: [
      {
        typeName: GEAR_PARRY,
        values: [
          1
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Shield, Medium",
    effects: [
      {
        typeName: GEAR_PARRY,
        values: [
          2
        ]
      },
      {
        typeName: GEAR_DODGE,
        values: [
          2
        ]
      },
    ],
    equipped: false
  },
  {
    name: "Shield, Large",
    effects: [
      {
        typeName: GEAR_PARRY,
        values: [
          2
        ]
      },
      {
        typeName: GEAR_DODGE,
        values: [
          4
        ]
      },
    ],
    equipped: false
  },

]

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

type StockGearDlgProps = {
  openDlg: boolean,
  closeDlg: () => void
}

const StockGearDlg = (props: StockGearDlgProps) => {
  const { openDlg, closeDlg } = props;
  const [char, setChar] = useContext(AppContext)!;
  
  const handleAddGear = (gear: GearType) => {
    let newChar = {...char};
    newChar.gear.push(gear);
    setChar(newChar);
  }

  const getGearBtns = () => {
    let ownedGearNames: Array<String> = [];
    char.gear.forEach(gear => {
      ownedGearNames.push(gear.name);
    });

    const gearButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allStockGear.forEach((gear, index) => {
      if (!ownedGearNames.includes(gear.name)) {
        gearButtons.push(
          <StyledButton key={index} onClick={() => handleAddGear(gear)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{gear.name}</StyledButton>
        );
      }
    });
    return gearButtons;
  }

  return (
    <Dialog open={openDlg} onClose={closeDlg}>
      <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Pick Gear to add</DialogTitle>
      <>{getGearBtns()}</>
      <StyledButton onClick={closeDlg} sx={{ marginBottom: 1, marginLeft: 1, marginRight: 1, marginTop: 1 }}>Done</StyledButton>
    </Dialog>
  );
}

export default StockGearDlg;