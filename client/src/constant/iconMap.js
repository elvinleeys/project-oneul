import {
    faHeart as solidHeart,
    faThumbsUp as solidLike,
    faFaceSmile as solidSmile,
    faFaceSadTear as solidSad,
    faFaceAngry as solidAngry,
} from "@fortawesome/free-solid-svg-icons";

import {
    faHeart as regularHeart,
    faThumbsUp as regularLike,
    faFaceSmile as regularSmile,
    faFaceSadTear as regularSad,
    faFaceAngry as regularAngry,
} from "@fortawesome/free-regular-svg-icons";

export const iconMap = {
    heart: { solid: solidHeart, regular: regularHeart, color: "#ff0000" },
    like: { solid: solidLike, regular: regularLike, color: "#0057ff" },
    smile: { solid: solidSmile, regular: regularSmile, color: "#fdd608" },
    sad: { solid: solidSad, regular: regularSad, color: "#0094ff" },
    angry: { solid: solidAngry, regular: regularAngry, color: "#a50fec" },
};
