import ts from "typescript";
import { parseCommentFromNode } from "./comment.parse";
import {
  KeywordType,
  TsFunctionModel,
  TsInterfaceModel,
  TsPropertyModel,
} from "../model";
import { parsePropertyFromNode } from "./property.parse";
import { parseFunctionFromNode } from "./function.parse";
import { LogFactory } from "@nmhillusion/n2log4web";

export function parseTypeAliasFromNode(
  filePath: string,
  tsSourceFile: ts.SourceFile,
  typeAliasNode: ts.TypeAliasDeclaration | ts.TypeLiteralNode
): TsInterfaceModel {
  const propertyList: TsPropertyModel[] = [];
  const methodList: TsFunctionModel[] = [];
  // console.log({ interfNode });

  let isExport = false;
  typeAliasNode.modifiers?.forEach((md) => {
    // console.log("modifier kind: ", ts.SyntaxKind[md.kind]);
    if (KeywordType.ExportKeyword === ts.SyntaxKind[md.kind]) {
      isExport = true;
    }
  });

  typeAliasNode.forEachChild((member) => {
    if (ts.isTypeLiteralNode(member)) {
      const typeLiteralNode: ts.TypeLiteralNode = member;
      propertyList.push(
        ...parseTypeAliasFromNode(filePath, tsSourceFile, typeLiteralNode)
          .propertyList
      );
    } else if (ts.isPropertySignature(member)) {
      propertyList.push(parsePropertyFromNode(tsSourceFile, member));
    } else if (ts.isMethodSignature(member)) {
      methodList.push(parseFunctionFromNode(filePath, tsSourceFile, member));
    } else {
      LogFactory.getNodeLog(__filename).info(
        "other member kind: ",
        ts.SyntaxKind[member.kind]
      );
    }
  });

  return {
    filePath,
    interfaceName: ts.isTypeAliasDeclaration(typeAliasNode)
      ? typeAliasNode.name.escapedText.toString()
      : "",
    comments: parseCommentFromNode(tsSourceFile, typeAliasNode),
    propertyList,
    methodList,
    isExport,
  };
}
