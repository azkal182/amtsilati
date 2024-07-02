import { View } from "react-native";

interface Props<T> {
  data: T[];
  renderItem(item: T): JSX.Element;
  col?: number;
}

const GridView = <T extends any>(props: Props<T>) => {
  const { data, renderItem, col = 2 } = props;

  return (
    <View style={{ width: "100%", flexDirection: "row", flexWrap: "wrap" }}>
      {data.map((item, index) => {
        const widthPercentage = 100 / col;
        return (
          <View key={index} style={{ width: `${widthPercentage}%` }}>
            <View className="w-full py-1">{renderItem(item)}</View>
          </View>
        );
      })}
    </View>
  );
};

export default GridView;
