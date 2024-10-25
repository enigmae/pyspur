from pydantic import BaseModel
import importlib


class NodeType(BaseModel):
    node_type_name: str
    class_name: str
    module: str

    @property
    def node_class(self):
        module = importlib.import_module(name=f"{self.module}", package="app")
        return getattr(module, self.class_name)

    @property
    def input_model(self):
        return self.node_class.input_model


class MinimumNodeConfig(BaseModel):
    node_type: NodeType