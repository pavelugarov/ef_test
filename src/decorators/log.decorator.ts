

export function LogParameter(target: Object, propertyKey: string, parameterIndex: number) {
  console.log(`Parameter decorator applied to:`);
  console.log(`  Target:`, target[propertyKey].toString());
  console.log(`  Method Name:`, String(propertyKey));
  console.log(`  Parameter Index:`, parameterIndex);


}