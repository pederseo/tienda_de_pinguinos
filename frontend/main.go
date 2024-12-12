package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"html/template"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

)

// Variables globales
var client *mongo.Client

// Estructura para los productos
type Producto struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Price int    `json:"price"`
	Image string `json:"image"`
}

// Estructura para el cliente
type Cliente struct {
	Direction string `json:"direction"`
}

// Estructura para el pedido
type Pedido struct {
	Client   Cliente    `json:"client"`
	Products []Producto `json:"products"`
	Total    int        `json:"total"`
	Status   string     `json:"status"`
}

// Conectar a MongoDB
func conectarMongoDB() {
	uri := "mongodb://localhost:27017" // Cambia si tu MongoDB está en otro host o puerto
	clientOptions := options.Client().ApplyURI(uri)
	var err error
	client, err = mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatalf("Error al conectar a MongoDB: %v", err)
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatalf("No se pudo hacer ping a la base de datos: %v", err)
	}
	fmt.Println("✅ Conexión a MongoDB exitosa")
}

// Obtener productos de la base de datos
func obtenerProductos() ([]Producto, error) {
	collection := client.Database("penguin_store").Collection("products")
	filter := bson.D{}
	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	var productos []Producto
	for cursor.Next(context.TODO()) {
		var producto Producto
		if err := cursor.Decode(&producto); err != nil {
			return nil, err
		}
		productos = append(productos, producto)
	}
	if err := cursor.Err(); err != nil {
		return nil, err
	}
	return productos, nil
}

// Guardar el pedido en MongoDB
func guardarPedido(pedido Pedido) error {
	collection := client.Database("penguin_store").Collection("orders")
	_, err := collection.InsertOne(context.TODO(), pedido)
	return err
}

// Función para manejar la página principal
func mostrarPaginaPrincipal(w http.ResponseWriter, r *http.Request) {
	productos, err := obtenerProductos()
	if err != nil {
		http.Error(w, "No se pudieron cargar los productos", http.StatusInternalServerError)
		return
	}

	// Cargar la plantilla HTML
	tmpl, err := template.ParseFiles("templates/index.html")
	if err != nil {
		http.Error(w, "Error al cargar la plantilla", http.StatusInternalServerError)
		return
	}

	// Ejecutar la plantilla con los datos de los productos
	tmpl.Execute(w, productos)
}

// Función para manejar la realización del pedido
func realizarPedido(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		productID := r.FormValue("product_id")

		direccion := r.FormValue("direccion")

		// Aquí deberías obtener el producto desde la base de datos por su ID
		productos, err := obtenerProductos()
		if err != nil {
			http.Error(w, "Error al cargar productos para el pedido", http.StatusInternalServerError)
			return
		}

		var productoSeleccionado Producto
		for _, producto := range productos {
			if producto.ID == productID {
				productoSeleccionado = producto
			}
		}

		// Calcular el total
		// Aquí debes convertir "cantidad" de string a int
		// Y hacer la multiplicación para el subtotal
		total := productoSeleccionado.Price * 2 // Solo por ahora como ejemplo

		// Crear el pedido
		pedido := Pedido{
			Client: Cliente{
				Direction: direccion,
			},
			Products: []Producto{productoSeleccionado},
			Total:    total,
			Status:   "pending",
		}

		// Guardar el pedido en la base de datos
		err = guardarPedido(pedido)
		if err != nil {
			http.Error(w, "Error al guardar el pedido", http.StatusInternalServerError)
			return
		}

		// Redirigir a la página de detalles del pedido
		tmpl, err := template.ParseFiles("templates/pedido.html")
		if err != nil {
			http.Error(w, "Error al cargar la plantilla del pedido", http.StatusInternalServerError)
			return
		}

		// Ejecutar la plantilla con el pedido realizado
		tmpl.Execute(w, pedido)
	}
}

func main() {
	// Conectar a la base de datos
	conectarMongoDB()

	// Ruta para la página principal
	http.HandleFunc("/", mostrarPaginaPrincipal)

	// Ruta para realizar un pedido
	http.HandleFunc("/realizar-pedido", realizarPedido)

	// Iniciar el servidor web
	log.Println("Servidor corriendo en http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
