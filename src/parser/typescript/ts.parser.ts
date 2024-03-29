import path from "path";
import * as fs from "fs";
import ts from "typescript";
import { TsFileModel, TsFunctionModel, TsInterfaceModel } from "./model";
import { TsClassModel } from "./model";
import {
  parseClassFromNode,
  parseFunctionFromNode,
  parseInterfaceFromNode,
  parseTypeAliasFromNode,
} from "./part-parser";
import { parseExportFromNode } from "./part-parser/export.parse";
import { LogFactory } from "@nmhillusion/n2log4web";

export class TsParser {
  private __tsFilePath: string = "";

  get tsFilePath() {
    return this.__tsFilePath;
  }

  constructor(tsFilePath: fs.PathLike) {
    this.__tsFilePath = path.resolve(String(tsFilePath));
  }

  parse(): TsFileModel {
    const tsSourceFile = ts.createSourceFile(
      path.basename(String(this.__tsFilePath)),
      fs.readFileSync(this.__tsFilePath).toString(),
      ts.ScriptTarget.Latest
    );

    const tsClassList: TsClassModel[] = [];
    const tsFunctionList: TsFunctionModel[] = [];
    const tsInterfaceList: TsInterfaceModel[] = [];
    const tsExportList = [];

    tsSourceFile.forEachChild((child) => {
      if (ts.isClassDeclaration(child)) {
        tsClassList.push(
          parseClassFromNode(this.tsFilePath, tsSourceFile, child)
        );
      } else if (ts.isFunctionDeclaration(child)) {
        tsFunctionList.push(
          parseFunctionFromNode(this.tsFilePath, tsSourceFile, child)
        );
      } else if (ts.isInterfaceDeclaration(child)) {
        tsInterfaceList.push(
          parseInterfaceFromNode(this.tsFilePath, tsSourceFile, child)
        );
      } else if (ts.isTypeAliasDeclaration(child)) {
        tsInterfaceList.push(
          parseTypeAliasFromNode(this.tsFilePath, tsSourceFile, child)
        );
      } else if (ts.isExportDeclaration(child)) {
        tsExportList.push(
          parseExportFromNode(this.tsFilePath, tsSourceFile, child)
        );
      } else if (
        ts.SyntaxKind[ts.SyntaxKind.EndOfFileToken] == ts.SyntaxKind[child.kind]
      ) {
        /// nothing to do with end of file token
      } else {
        LogFactory.getNodeLog(__filename).warn(
          "NOT define > nodeKind: ",
          ts.SyntaxKind[child.kind]
        );
      }
    });

    return {
      tsClassList,
      tsFunctionList,
      tsInterfaceList,
      tsExportList,
    };
  }
}
