package at.fhj.server;

import at.fhj.SimpQui;
import at.fhj.question.QuestionPool;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.util.log.Log;
import org.eclipse.jetty.websocket.jsr356.server.deploy.WebSocketServerContainerInitializer;

import static at.fhj.SimpQui.PropertyKey.ServerPort;

public class ServerStart {
    public static void main(String[] args) {
        SimpQui.INSTANCE.loadProperties();

        var server = new Server();
        var connector = new ServerConnector(server);
        connector.setPort(Integer.parseInt(SimpQui.INSTANCE.getProperty(ServerPort)));
        server.addConnector(connector);

        // Setup the basic application "context" for this application at "/"
        // This is also known as the handler tree (in jetty speak)
        var context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);

        try
        {
            QuestionPool.INSTANCE.getClass().getSimpleName();
            // Initialize javax.websocket layer
            WebSocketServerContainerInitializer
                    .configureContext(context)
                    // Add WebSocket endpoint to javax.websocket layer
                    .addEndpoint(ServerEndpoint.class);

            server.start();
            server.dump(System.err);
            server.join();
        }
        catch (Throwable t)
        {
            t.printStackTrace(System.err);
        }
    }
}
